import { RoleTabs } from '../../src/components/roleTabs';

export default function ParentLayout() {
  return (
    <RoleTabs
      tabs={[
        { name: 'index', title: 'היום שלי', icon: 'sunny-outline' },
        { name: 'photos', title: 'תמונות', icon: 'images-outline' },
        { name: 'messages', title: 'הודעות', icon: 'chatbubble-outline' },
        { name: 'payments', title: 'תשלומים', icon: 'card-outline' },
        { name: 'more', title: 'עוד', icon: 'ellipsis-horizontal' },
      ]}
    />
  );
}
