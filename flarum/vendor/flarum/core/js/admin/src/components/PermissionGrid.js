import Component from 'flarum/Component';
import PermissionDropdown from 'flarum/components/PermissionDropdown';
import ConfigDropdown from 'flarum/components/ConfigDropdown';
import Button from 'flarum/components/Button';
import ItemList from 'flarum/utils/ItemList';

export default class PermissionGrid extends Component {
  constructor(...args) {
    super(...args);

    this.permissions = this.permissionItems().toArray();
  }

  view() {
    const scopes = this.scopeItems().toArray();

    const permissionCells = permission => {
      return scopes.map(scope => (
        <td>
          {scope.render(permission)}
        </td>
      ));
    };

    return (
      <table className="PermissionGrid">
        <thead>
          <tr>
            <td></td>
            {scopes.map(scope => (
              <th>
                {scope.label}{' '}
                {scope.onremove ? Button.component({icon: 'times', className: 'Button Button--text PermissionGrid-removeScope', onclick: scope.onremove}) : ''}
              </th>
            ))}
            <th>{this.scopeControlItems().toArray()}</th>
          </tr>
        </thead>
        {this.permissions.map(section => (
          <tbody>
            <tr className="PermissionGrid-section">
              <th>{section.label}</th>
              {permissionCells(section)}
              <td/>
            </tr>
            {section.children.map(child => (
              <tr className="PermissionGrid-child">
                <th>{child.label}</th>
                {permissionCells(child)}
                <td/>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    );
  }

  permissionItems() {
    const items = new ItemList();

    items.add('view', {
      label: '访问相关',
      children: this.viewItems().toArray()
    });

    items.add('start', {
      label: '话题相关',
      children: this.startItems().toArray()
    });

    items.add('reply', {
      label: '回复相关',
      children: this.replyItems().toArray()
    });

    items.add('moderate', {
      label: '管理相关',
      children: this.moderateItems().toArray()
    });

    return items;
  }

  viewItems() {
    const items = new ItemList();

    items.add('view', {
      label: '浏览话题',
      permission: 'forum.view',
      allowGuest: true
    });

    items.add('signUp', {
      label: '注册账户',
      setting: () => ConfigDropdown.component({
        key: 'allow_sign_up',
        options: [
          {value: '1', label: '开启'},
          {value: '0', label: '关闭'}
        ]
      })
    });

    return items;
  }

  startItems() {
    const items = new ItemList();

    items.add('start', {
      label: '发布话题',
      permission: 'forum.startDiscussion'
    });

    items.add('allowRenaming', {
      label: '修改标题',
      setting: () => {
        const minutes = parseInt(app.config.allow_renaming, 10);

        return ConfigDropdown.component({
          defaultLabel: minutes ? `For ${minutes} minutes` : 'Indefinitely',
          key: 'allow_renaming',
          options: [
            {value: '-1', label: '无限期'},
            {value: '10', label: '发布 10 分钟内'},
            {value: 'reply', label: '直到被回复'}
          ]
        });
      }
    });

    return items;
  }

  replyItems() {
    const items = new ItemList();

    items.add('reply', {
      label: '回复话题',
      permission: 'discussion.reply'
    });

    items.add('allowPostEditing', {
      label: '修改内容',
      setting: () => {
        const minutes = parseInt(app.config.allow_post_editing, 10);

        return ConfigDropdown.component({
          defaultLabel: minutes ? `For ${minutes} minutes` : 'Indefinitely',
          key: 'allow_post_editing',
          options: [
            {value: '-1', label: '无限期'},
            {value: '10', label: '发表 10 分钟内'},
            {value: 'reply', label: '直到下一条回复'}
          ]
        });
      }
    });

    return items;
  }

  moderateItems() {
    const items = new ItemList();

    items.add('editPosts', {
      label: '编辑内容',
      permission: 'discussion.editPosts'
    });

    items.add('deletePosts', {
      label: '删除回复',
      permission: 'discussion.deletePosts'
    });

    items.add('renameDiscussions', {
      label: '修改标题',
      permission: 'discussion.rename'
    });

    items.add('deleteDiscussions', {
      label: '删除话题',
      permission: 'discussion.delete'
    });

    return items;
  }

  scopeItems() {
    const items = new ItemList();

    items.add('global', {
      label: '全局',
      render: item => {
        if (item.setting) {
          return item.setting();
        } else if (item.permission) {
          return PermissionDropdown.component(Object.assign({}, item));
        }

        return '';
      }
    });

    return items;
  }

  scopeControlItems() {
    return new ItemList();
  }
}
