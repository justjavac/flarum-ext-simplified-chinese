import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import { slug } from 'flarum/utils/string';

import tagLabel from 'tags/helpers/tagLabel';

/**
 * The `EditTagModal` component shows a modal dialog which allows the user
 * to create or edit a tag.
 */
export default class EditTagModal extends Modal {
  constructor(...args) {
    super(...args);

    this.tag = this.props.tag || app.store.createRecord('tags');

    this.name = m.prop(this.tag.name() || '');
    this.slug = m.prop(this.tag.slug() || '');
    this.description = m.prop(this.tag.description() || '');
    this.color = m.prop(this.tag.color() || '');
    this.isHidden = m.prop(this.tag.isHidden() || false);
  }

  className() {
    return 'EditTagModal Modal--small';
  }

  title() {
    return this.name()
      ? tagLabel({
        name: this.name,
        color: this.color
      })
      : '创建';
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>名称</label>
            <input className="FormControl" placeholder="分类名称" value={this.name()} oninput={e => {
              this.name(e.target.value);
              this.slug(slug(e.target.value));
            }}/>
          </div>

          <div className="Form-group">
            <label>目录</label>
            <input className="FormControl" value={this.slug()} oninput={m.withAttr('value', this.slug)}/>
          </div>

          <div className="Form-group">
            <label>描述</label>
            <textarea className="FormControl" value={this.description()} oninput={m.withAttr('value', this.description)}/>
          </div>

          <div className="Form-group">
            <label>颜色</label>
            <input className="FormControl" placeholder="#aaaaaa" value={this.color()} oninput={m.withAttr('value', this.color)}/>
          </div>

          <div className="Form-group">
            <div>
              <label className="checkbox">
                <input type="checkbox" value="1" checked={this.isHidden()} onchange={m.withAttr('checked', this.isHidden)}/>
                所有话题中隐藏
              </label>
            </div>
          </div>

          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary EditTagModal-save',
              loading: this.loading,
              children: '保存更改'
            })}
            {this.tag.exists ? (
              <button type="button" className="Button EditTagModal-delete" onclick={this.delete.bind(this)}>
                Delete Tag
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

    this.tag.save({
      name: this.name(),
      slug: this.slug(),
      description: this.description(),
      color: this.color(),
      isHidden: this.isHidden()
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }

  delete() {
    if (confirm('你确定删除这个分类吗？删除后该分类中的话题不会被删除。 ')) {
      this.tag.delete().then(() => m.redraw());
      this.hide();
    }
  }
}
