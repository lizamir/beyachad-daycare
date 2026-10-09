-- ביחד: סכמת ליבה + הרשאות ברמת שורה (RLS).
-- ההרשאות נאכפות כאן, בשרת, ולא רק בהסתרת כפתורים באפליקציה.
-- להרצה: Supabase Dashboard -> SQL Editor -> הדבקה והרצה.

create extension if not exists pgcrypto;

-- ───────── טבלאות ─────────

create table public.institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind text not null default 'family_daycare' check (kind in ('family_daycare','daycare','kindergarten')),
  timezone text not null default 'Asia/Jerusalem',
  created_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','staff','parent')),
  display_name text not null default '',
  created_at timestamptz not null default now(),
  unique (institution_id, user_id)
);
create index on public.memberships (user_id);

create table public.children (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  full_name text not null,
  birth_date date,
  allergies text not null default '',
  care_notes text not null default '',
  archived boolean not null default false,
  created_at timestamptz not null default now()
);
create index on public.children (institution_id);

create table public.child_guardians (
  child_id uuid not null references public.children(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  relation text not null default '',
  primary key (child_id, user_id)
);
create index on public.child_guardians (user_id);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  day date not null,
  status text not null check (status in ('expected','present','absent','left')),
  arrived_at timestamptz,
  left_at timestamptz,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now(),
  unique (child_id, day)
);

create table public.care_events (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  kind text not null check (kind in ('meal','sleep','diaper','toilet','mood','activity','note')),
  occurred_at timestamptz not null default now(),
  ended_at timestamptz,
  detail text not null default '',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  check (ended_at is null or ended_at >= occurred_at)
);
create index on public.care_events (child_id, occurred_at desc);

create table public.charges (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  period text not null,                       -- למשל 2026-10
  amount_agorot integer not null check (amount_agorot >= 0),
  due_date date not null,
  note text not null default '',
  created_at timestamptz not null default now(),
  unique (child_id, period)                   -- מונע חיוב כפול לאותה תקופה
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  charge_id uuid not null references public.charges(id) on delete cascade,
  amount_agorot integer not null check (amount_agorot > 0),
  paid_at date not null default current_date,
  method text not null default '',
  created_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  title text not null,
  body text not null default '',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

-- ───────── פונקציות עזר (security definer: מונעות רקורסיה ב־RLS) ─────────

create function public.has_role(inst uuid, roles text[])
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.memberships
    where institution_id = inst and user_id = auth.uid() and role = any(roles)
  );
$$;

create function public.is_member(inst uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.has_role(inst, array['admin','staff','parent']);
$$;

create function public.is_guardian_of(child uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.child_guardians where child_id = child and user_id = auth.uid()
  );
$$;

-- הקמת משפחתון: המשתמש המחובר נהיה מנהלת שלו.
create function public.create_institution(p_name text, p_display_name text default '')
returns uuid language plpgsql security definer set search_path = public as $$
declare new_id uuid;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  insert into public.institutions (name) values (p_name) returning id into new_id;
  insert into public.memberships (institution_id, user_id, role, display_name)
  values (new_id, auth.uid(), 'admin', p_display_name);
  return new_id;
end;
$$;

-- ───────── RLS ─────────

alter table public.institutions    enable row level security;
alter table public.memberships     enable row level security;
alter table public.children        enable row level security;
alter table public.child_guardians enable row level security;
alter table public.attendance      enable row level security;
alter table public.care_events     enable row level security;
alter table public.charges         enable row level security;
alter table public.payments        enable row level security;
alter table public.announcements   enable row level security;

-- מסגרת
create policy inst_select on public.institutions for select using (public.is_member(id));
create policy inst_update on public.institutions for update using (public.has_role(id, array['admin']));

-- שיוכי תפקיד: כל אחד רואה את שלו; מנהלת רואה ומנהלת את כל המסגרת
create policy mem_select on public.memberships for select
  using (user_id = auth.uid() or public.has_role(institution_id, array['admin']));
create policy mem_admin_write on public.memberships for all
  using (public.has_role(institution_id, array['admin']))
  with check (public.has_role(institution_id, array['admin']));

-- ילדים: מנהלת וצוות רואים את כולם במסגרת; הורה רק את ילדיו
create policy children_select on public.children for select using (
  public.has_role(institution_id, array['admin','staff']) or public.is_guardian_of(id)
);
create policy children_admin_write on public.children for all
  using (public.has_role(institution_id, array['admin']))
  with check (public.has_role(institution_id, array['admin']));

create policy guardians_select on public.child_guardians for select using (
  user_id = auth.uid()
  or public.has_role((select institution_id from public.children c where c.id = child_id), array['admin'])
);
create policy guardians_admin_write on public.child_guardians for all
  using (public.has_role((select institution_id from public.children c where c.id = child_id), array['admin']))
  with check (public.has_role((select institution_id from public.children c where c.id = child_id), array['admin']));

-- נוכחות ויומן טיפול: קריאה למנהלת/צוות/הורי הילד; כתיבה למנהלת/צוות
create policy att_select on public.attendance for select using (
  public.has_role(institution_id, array['admin','staff']) or public.is_guardian_of(child_id)
);
create policy att_write on public.attendance for all
  using (public.has_role(institution_id, array['admin','staff']))
  with check (public.has_role(institution_id, array['admin','staff']));

create policy care_select on public.care_events for select using (
  public.has_role(institution_id, array['admin','staff']) or public.is_guardian_of(child_id)
);
create policy care_insert on public.care_events for insert
  with check (public.has_role(institution_id, array['admin','staff']) and created_by = auth.uid());
create policy care_update on public.care_events for update
  using (public.has_role(institution_id, array['admin','staff']))
  with check (public.has_role(institution_id, array['admin','staff']));

-- כספים: מנהלת בלבד, והורה לילדיו. צוות אין גישה כלל.
create policy charges_select on public.charges for select using (
  public.has_role(institution_id, array['admin']) or public.is_guardian_of(child_id)
);
create policy charges_admin_write on public.charges for all
  using (public.has_role(institution_id, array['admin']))
  with check (public.has_role(institution_id, array['admin']));

create policy payments_select on public.payments for select using (
  public.has_role(institution_id, array['admin'])
  or public.is_guardian_of((select child_id from public.charges c where c.id = charge_id))
);
create policy payments_admin_write on public.payments for all
  using (public.has_role(institution_id, array['admin']))
  with check (public.has_role(institution_id, array['admin']));

-- הודעות כלליות
create policy ann_select on public.announcements for select using (public.is_member(institution_id));
create policy ann_admin_write on public.announcements for all
  using (public.has_role(institution_id, array['admin']))
  with check (public.has_role(institution_id, array['admin']) and created_by = auth.uid());

-- מונע ממשתמש מחובר לקרוא ישירות פונקציית הקמה בלי התחברות
revoke all on function public.create_institution(text, text) from public, anon;
grant execute on function public.create_institution(text, text) to authenticated;
