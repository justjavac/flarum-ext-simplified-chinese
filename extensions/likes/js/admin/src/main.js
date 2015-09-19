import { extend } from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('likes', () => {
  extend(PermissionGrid.prototype, 'replyItems', items => {
    items.add('likePosts', {
      label: '喜欢内容',
      permission: 'discussion.likePosts'
    });
  });
});
