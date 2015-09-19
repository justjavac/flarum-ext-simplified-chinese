import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import saveConfig from 'flarum/utils/saveConfig';

export default class EditCustomCssModal extends Modal {
  constructor(...args) {
    super(...args);

    this.customLess = m.prop(app.config.custom_less || '');
  }

  className() {
    return 'EditCustomCssModal Modal--large';
  }

  title() {
    return '编辑自定义CSS';
  }

  content() {
    return (
      <div className="Modal-body">
        <p>添加 LESS/CSS 代码以生成自定义样式作为默认站点外观。请详细阅读<a href="">使用文档</a>。</p>

        <div className="Form">
          <div className="Form-group">
            <textarea className="FormControl" rows="30" value={this.customLess()} onchange={m.withAttr('value', this.customLess)}/>
          </div>

          <div className="Form-group">
            {Button.component({
              className: 'Button Button--primary',
              children: '保存更改',
              loading: this.loading
            })}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    saveConfig({
      custom_less: this.customLess()
    }).then(() => window.location.reload());
  }
}
