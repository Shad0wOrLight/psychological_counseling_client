import { addMessage, delSession, getSessionList } from "@/http/modules/consult";
import { formatSessionList } from "@/utils/format";
import { defineStore } from "pinia";
import useUserStore from "./user";

const useConsultStore = defineStore("consult", {
  state: () => ({
    sessionList: [], //用户会话列表
    messageList: [], //消息列表
  }),
  actions: {
    async getUserSessionList() {
      const userStore = useUserStore();
      const res = await getSessionList(userStore.userInfo.uid);

      this.messageList = res.data;
      this.sessionList = formatSessionList(res.data, userStore.userInfo.uid);
    },
    async sendMessage(data) {
      addMessage(data);
    },
    async delelteSession(sendId, receiveId) {
      delSession(sendId, receiveId).then(() => {
        this.getUserSessionList();
      });
    },
    async addSession(data) {
      addMessage(data).then(() => {
        this.getUserSessionList();
      });
    },
  },
});

export default useConsultStore;
