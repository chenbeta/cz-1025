/*
 * @Description  : 公共方法封装，已挂载到window上
 * @Author       : chenLiang
 * @Date         : 2020-09-16 16:11:15
 * @LastEditors: chen<chenliang@itcast.cn>
 * @LastEditTime: 2020-10-17 10:03:21
 */
import { Toast, Dialog } from 'vant';

const pop = (str, options) => {
  let {
    position,
    onClose = () => { }, //关闭回调
    duration = 2000, //关闭时间
    type //方式
  } = options;
  Toast({
    message: str,
    onClose,
    type,
    duration,
    position
  });
};

/**
 * 消息提示
 *
 * @param {*} str
 * @param {*} options
 */
const msg = (str, options) => {
  pop(str, { ...options, type: 'text', position: 'top' });
};

msg.error = (str, options) => {
  pop(str, { ...options, type: 'fail' });
};

msg.success = (str, options) => {
  pop(str, { ...options, type: 'success' });
};

export { msg };

/**
 * 消息弹窗
 *
 * @param {*} str
 * @param {*} options
 */
export const msgBox = (str, options = {}) => {
  let {
    className = '', //自定义class名
    yes = function () { }, //确定事件
    cancel = function () { }, //取消事件
    buttons = ['确定'], //按钮数组名
    title = '信息', //标题
    closed = function () { } //弹窗关闭后事件
  } = options;
  Dialog({
    message: str,
    title,
    allowHtml: true,
    className: `common-msg-box ${className}`,
    showConfirmButton: buttons.length > 0,
    showCancelButton: buttons.length > 1,
    confirmButtonText: buttons[0] || '确认',
    cancelButtonText: buttons[1] || '取消',
    closed
  }).then(() => {
    yes();
  }).catch(() => {
    cancel();
  });
};
