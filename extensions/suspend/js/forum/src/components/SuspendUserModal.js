import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class SuspendUserModal extends Modal {
  constructor(...args) {
    super(...args);

    let until = this.props.user.suspendUntil();
    let status = null;

    if (new Date() > until) until = null;

    if (until) {
      if (until.getFullYear() === 9999) status = 'indefinitely';
      else status = 'limited';
    }

    this.status = m.prop(status);
    this.daysRemaining = m.prop(status === 'limited' && -moment().diff(until, 'days') + 1);
  }

  className() {
    return 'SuspendUserModal Modal--small';
  }

  title() {
    return '冻结用户 ' + this.props.user.username();
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>冻结状态</label>
            <div>
              <label className="checkbox">
                <input type="radio" name="status" checked={!this.status()} onclick={m.withAttr('value', this.status)}/>
                取消冻结
              </label>

              <label className="checkbox">
                <input type="radio" name="status" checked={this.status() === 'indefinitely'} value='indefinitely' onclick={m.withAttr('value', this.status)}/>
                永久冻结
              </label>

              <label className="checkbox SuspendUserModal-days">
                <input type="radio" name="status" checked={this.status() === 'limited'} value='limited' onclick={e => {
                  this.status(e.target.value);
                  m.redraw(true);
                  this.$('.SuspendUserModal-days-input input').select();
                  m.redraw.strategy('none');
                }}/>
                自定义时间
                {this.status() === 'limited' ? (
                  <div className="SuspendUserModal-days-input">
                    <input type="number"
                      value={this.daysRemaining()}
                      oninput={m.withAttr('value', this.daysRemaining)}
                      className="FormControl"/>
                    {' 天'}
                  </div>
                ) : ''}
              </label>
            </div>
          </div>

          <div className="Form-group">
            {Button.component({
              children: '保存更改',
              className: 'Button Button--primary',
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

    let suspendUntil = null;
    switch (this.status()) {
      case 'indefinitely':
        suspendUntil = new Date('9999-12-31');
        break;

      case 'limited':
        suspendUntil = moment().add(this.daysRemaining(), 'days').toDate();
        break;

      default:
        // no default
    }

    this.props.user.save({suspendUntil}).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
