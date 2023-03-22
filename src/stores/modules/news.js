import { defineStore } from "pinia";
import { getNewsListByCondition } from "@/http/modules/news";
import useHomeStore from "./home";
import { findUserNameById } from "@/utils/find";
import { listOrderByDesc } from "@/utils/format";

const useNewsStore = defineStore("news", {
  state: () => ({
    currentTabName: "全部", //当前标签名
    currentList: [], //当前资讯列表
    currentHotList: [], //当前热门列表
    newList: [], //最新资讯列表
  }),
  actions: {
    // 获取资讯列表
    async findNews(data) {
      const res = await getNewsListByCondition(data);
      const homeStore = useHomeStore();
      this.currentList = findUserNameById(homeStore.userList, res.data);
      this.newList = listOrderByDesc(res.data);
      data?.tags || this.getCurrentHotList(res.data);
    },
    // 获取热门资讯列表
    async getCurrentHotList(list) {
      this.currentHotList = list.filter((item) => item.isHot == 1);
    },
  },
});

export default useNewsStore;
