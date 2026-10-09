import { RoleTabs } from '../../src/components/roleTabs';

export default function AdminLayout() {
  return (
    <RoleTabs
      tabs={[
        { name: 'index', title: 'היום', icon: 'home-outline' },
        { name: 'children', title: 'ילדים', icon: 'people-outline' },
        { name: 'finance', title: 'כספים', icon: 'card-outline' },
        { name: 'messages', title: 'הודעות', icon: 'chatbubble-outline' },
        { name: 'more', title: 'עוד', icon: 'ellipsis-horizontal' },
      ]}
    />
  );
}
