import useConsultStore from "@/stores/modules/consult";

let consultStore = null;

let ws = null;

export const init = (userId) => {
  consultStore = useConsultStore();
  ws = new WebSocket(`ws://127.0.0.1:8888/websocket/${userId}`);
  ws.onopen = onOpen;
  ws.onclose = onClose;
  ws.onmessage = onMessage;
  ws.onerror = onError;
  ws.sendMessage = sendMessage;
  ws.websocketClose = websocketClose;
};

export const onOpen = (e) => {
  console.log("连接成功！", e);
};
export const onClose = (e) => {
  console.log("连接断开！", e);
};
export const onError = (e) => {
  console.log(e);
};
export const onMessage = (e) => {
  // console.log(e.data);
  consultStore.getUserSessionList();
};
export const websocketClose = () => {
  ws.close();
};
export const sendMessage = (data) => {
  ws.send(JSON.stringify(data));
};
// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
  ws.close();
};
