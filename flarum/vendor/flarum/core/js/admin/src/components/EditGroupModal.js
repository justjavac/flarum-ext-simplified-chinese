import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Badge from 'flarum/components/Badge';
import Group from 'flarum/models/Group';

/**
 * The `EditGroupModal` component shows a modal dialog which allows the user
 * to create or edit a group.
 */
export default class EditGroupModal extends Modal {
  constructor(...args) {
    super(...args);

    this.group = this.props.group || app.store.createRecord('groups');

    this.nameSingular = m.prop(this.group.nameSingular() || '');
    this.namePlural = m.prop(this.group.namePlural() || '');
    this.icon = m.prop(this.group.icon() || '');
    this.color = m.prop(this.group.color() || '');
  }

  className() {
    return 'EditGroupModal Modal--small';
  }

  title() {
    return [
      this.color() || this.icon() ? Badge.component({
        icon: this.icon(),
        style: {backgroundColor: this.color()}
      }) : '',
      ' ',
      this.namePlural() || '新用户组'
    ];
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>名称</label>
            <div className="EditGroupModal-name-input">
              <input className="FormControl" placeholder="单个用户 (例如 Mod)" value={this.nameSingular()} oninput={m.withAttr('value', this.nameSingular)}/>
              <input className="FormControl" placeholder="用户组 (例如 Mods)" value={this.namePlural()} oninput={m.withAttr('value', this.namePlural)}/>
            </div>
          </div>

          <div className="Form-group">
            <label>颜色</label>
            <input className="FormControl" placeholder="#aaaaaa" value={this.color()} oninput={m.withAttr('value', this.color)}/>
          </div>

          <div className="Form-group">
            <label>图标</label>
            <div className="helpText">
              输入任意一个 <a href="http://fortawesome.github.io/Font-Awesome/icons/" tabindex="-1">FontAwesome</a> 图标名称，无需添加 <code>fa-</code> 前缀
            </div>
            <input className="FormControl" placeholder="bolt" value={this.icon()} oninput={m.withAttr('value', this.icon)}/>
          </div>

          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary EditGroupModal-save',
              loading: this.loading,
              children: '保存更改'
            })}
            {this.group.exists && this.group.id() !== Group.ADMINISTRATOR_ID ? (
              <button type="button" className="Button EditGroupModal-delete" onclick={this.delete.bind(this)}>
                删除用户组
              </button>
            ) : ''}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    this.group.save({
      nameSingular: this.nameSingular(),
      namePlural: this.namePlural(),
      color: this.color(),
      icon: this.icon()
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }

  delete() {
    if (confirm('你确定删除这个用户组吗？删除后该用户组中的用户不会被删除。')) {
      this.group.delete().then(() => m.redraw());
      this.hide();
    }
  }
}
