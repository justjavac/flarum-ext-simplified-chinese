import Modal from 'flarum/components/Modal';

export default class LoadingModal extends Modal {
  isDismissible() {
    return false;
  }

  className() {
    return 'LoadingModal Modal--small';
  }

  title() {
    return '请等待...';
  }

  content() {
    return '';
  }
}
