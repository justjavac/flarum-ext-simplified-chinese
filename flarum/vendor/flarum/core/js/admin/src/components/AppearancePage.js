import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import Switch from 'flarum/components/Switch';
import EditCustomCssModal from 'flarum/components/EditCustomCssModal';
import saveConfig from 'flarum/utils/saveConfig';

export default class AppearancePage extends Component {
  constructor(...args) {
    super(...args);

    this.primaryColor = m.prop(app.config.theme_primary_color);
    this.secondaryColor = m.prop(app.config.theme_secondary_color);
    this.darkMode = m.prop(app.config.theme_dark_mode === '1');
    this.coloredHeader = m.prop(app.config.theme_colored_header === '1');
  }

  view() {
    return (
      <div className="AppearancePage">
        <div className="container">
          <form onsubmit={this.onsubmit.bind(this)}>
            <fieldset className="AppearancePage-colors">
              <legend>外观色彩</legend>
              <div className="helpText">
                选择两种颜色作为站点主题。第一种将用作突出显示颜色，第二种将用于背景元素的样式。
              </div>

              <div className="AppearancePage-colors-input">
                <input className="FormControl" placeholder="#aaaaaa" value={this.primaryColor()} onchange={m.withAttr('value', this.primaryColor)}/>
                <input className="FormControl" placeholder="#aaaaaa" value={this.secondaryColor()} onchange={m.withAttr('value', this.secondaryColor)}/>
              </div>

              {Switch.component({
                state: this.darkMode(),
                children: '夜间模式',
                onchange: this.darkMode
              })}

              {Switch.component({
                state: this.coloredHeader(),
                children: '彩色头部',
                onchange: this.coloredHeader
              })}

              {Button.component({
                className: 'Button Button--primary',
                children: '保存更改',
                loading: this.loading
              })}
            </fieldset>
          </form>

          <fieldset>
            <legend>自定义样式</legend>
            <div className="helpText">
              添加 LESS/CSS 代码以生成自定义样式作为默认站点外观。
            </div>
            {Button.component({
              className: 'Button',
              children: '编辑自定义CSS',
              onclick: () => app.modal.show(new EditCustomCssModal())
            })}
          </fieldset>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    const hex = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;

    if (!hex.test(this.primaryColor()) || !hex.test(this.secondaryColor())) {
      alert('请输入一个十六进制颜色代码');
      return;
    }

    this.loading = true;

    saveConfig({
      theme_primary_color: this.primaryColor(),
      theme_secondary_color: this.secondaryColor(),
      theme_dark_mode: this.darkMode(),
      theme_colored_header: this.coloredHeader()
    }).then(() => window.location.reload());
  }
}
