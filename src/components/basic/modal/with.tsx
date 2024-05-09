import { createVNode as _createVNode } from 'vue';
import _extends from '@babel/runtime/helpers/esm/extends';
import { Button } from 'ant-design-vue';
import {
  InfoCircleFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons-vue';
export function withWarn(props) {
  return _extends(
    _extends(
      {
        icon: function icon() {
          return _createVNode(ExclamationCircleFilled, null, null);
        },
        okCancel: false,
        centered: true,
      },
      props,
    ),
    {
      type: 'warning',
    },
  );
}
export function withInfo(props) {
  return _extends(
    _extends(
      {
        icon: function icon() {
          return _createVNode(InfoCircleFilled, null, null);
        },
        okCancel: false,
        centered: true,
      },
      props,
    ),
    {
      type: 'info',
    },
  );
}
export function withSuccess(props) {
  return _extends(
    _extends(
      {
        icon: function icon() {
          return _createVNode(CheckCircleFilled, null, null);
        },
        okCancel: false,
        centered: true,
      },
      props,
    ),
    {
      type: 'success',
    },
  );
}
export function withError(props) {
  return _extends(
    _extends(
      {
        icon: function icon() {
          return _createVNode(CloseCircleFilled, null, null);
        },
        okCancel: false,
        centered: true,
      },
      props,
    ),
    {
      type: 'error',
    },
  );
}
export function withConfirm(props) {
  return _extends(
    _extends(
      {
        icon: function icon() {
          return _createVNode(QuestionCircleFilled, null, null);
        },
        okCancel: true,
        centered: true,
      },
      props,
    ),
    {
      type: 'confirm',
    },
  );
}
//  生成内容css 拼接属性
const modalContentRender = (props) => {
  return (
    <div class="ant-modal-content">
      <div class="ant-modal-body">
        <div class="ant-modal-confirm-body-wrapper">
          <div class="ant-modal-confirm-body">
            {props.icon}
            <span class="ant-modal-confirm-title">{props.title || '提示'}</span>
            <div class="ant-modal-confirm-content">{props.content || '内容'}</div>
          </div>
          <div class="ant-modal-confirm-btns">
            <Button onClick={props.onCancel}>{props.cancelText || '取消'}</Button>
            <Button onClick={props.onOk}> {props.okText || '确定'}</Button>
            <Button onClick={props.onAction} type="primary">
              {' '}
              {props.actionText || '行为'}{' '}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export function withActionModal(props) {
  return _extends(props, {
    modalRender: () => {
      return modalContentRender(props);
    },
  });
}
export function withConfirmAndAction(props) {
  return _extends(
    _extends(
      {
        icon: function icon() {
          return _createVNode(ExclamationCircleFilled, null, null);
        },
        okCancel: true,
        centered: true,
        modalRender: () => {
          return modalContentRender(props);
        },
      },
      props,
    ),
    {
      type: 'confirm',
    },
  );
}
