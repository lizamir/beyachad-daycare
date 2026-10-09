import { RoleTabs } from '../../src/components/roleTabs';

export default function StaffLayout() {
  return (
    <RoleTabs
      tabs={[
        { name: 'index', title: 'הקבוצה', icon: 'people-outline' },
        { name: 'photos', title: 'תמונות', icon: 'images-outline' },
        { name: 'messages', title: 'הודעות', icon: 'chatbubble-outline' },
        { name: 'more', title: 'עוד', icon: 'ellipsis-horizontal' },
      ]}
    />
  );
}
