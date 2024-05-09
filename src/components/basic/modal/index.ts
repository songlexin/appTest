import Modal, { destroyFns } from 'ant-design-vue/es/modal/Modal';
import confirm from 'ant-design-vue/es/modal/confirm';

import { withWarn, withInfo, withSuccess, withError, withConfirm, withActionModal } from './with';
function modalWarn(props) {
  return confirm(withWarn(props));
}

Modal.info = function infoFn(props) {
  return confirm(withInfo(props));
};

Modal.success = function successFn(props) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props) {
  return confirm(withError(props));
};

Modal.warning = modalWarn;
Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props) {
  return confirm(withConfirm(props));
};
Modal.action = {
  confirm: (props) => confirm(withActionModal(withConfirm(props))),
  success: (props) => confirm(withActionModal(withSuccess(props))),
};
Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();

    if (close) {
      close();
    }
  }
};
Modal.install = function (app) {
  app.component(Modal.name, Modal);
  return app;
};

export default Modal;
