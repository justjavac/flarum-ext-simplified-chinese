import { extend } from 'flarum/extend';
import PermissionGrid from 'flarum/components/PermissionGrid';

export default function() {
  extend(PermissionGrid.prototype, 'moderateItems', items => {
    items.add('tag', {
      label: '编辑标签',
      permission: 'discussion.tag'
    });
  });
}
