/*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Modal from 'flarum/components/Modal';

export default class AddExtensionModal extends Modal {
  className() {
    return 'AddExtensionModal Modal--small';
  }

  title() {
    return '添加插件';
  }

  content() {
    return (
      <div className="Modal-body">
        <p>在不久的将来，这个对话框能让你轻松地添加一个新的拓展到你的站点，我们正在构建一个新的生态系统。</p>
        <p>与此同时，如果你能获得一个新的拓展，简单地展示在你的站点 <code>extensions</code> 目录。</p>
        <p>如果你是开发者，你可以<a href="http://flarum.org/docs/extend">阅读开发文档</a>，并开发出新的插件。</p>
      </div>
    );
  }
}
