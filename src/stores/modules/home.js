import { defineStore } from "pinia";
import { getNewsList } from "@/http/modules/news";
import { getUserList } from "@/http/modules/user";
import { findUserNameById } from "@/utils/find";
import { getEvaluationList } from "@/http/modules/evaluation";
import { getArticleList } from "@/http/modules/forum";
import { globalSeach } from "@/http/modules/globalSearch";
import { listOrderByDesc } from "@/utils/format";
const useHomeStore = defineStore("home", {
  state: () => ({
    newsList: [], //资讯列表
    evaluationList: [], //测评列表
    topicList: [], //帖子列表
    userList: [], //用户列表
    consultantList: [], //咨询师列表
    articleList: [], //帖子列表
    searchList: "", //当前搜索结果列表
  }),
  actions: {
    // 分页获取资讯
    async getAllNews() {
      const res1 = await getNewsList();
      const res2 = await getUserList();
      this.userList = res2.data;
      this.newsList = findUserNameById(res2.data, res1.data.items);
    },

    // 分页获取测评
    async getAllEvaluation() {
      const res = await getEvaluationList(1, 3);
      this.evaluationList = res.data.items;
    },

    //分页获取咨询师列表
    async getAllConsultant() {
      const res = await getUserList({ role: 1 });
      this.consultantList = res.data.slice(0, 5);
    },

    //分页获取帖子列表
    async getAllArticle() {
      const res = await getArticleList();
      this.articleList = listOrderByDesc(res.data.items);
    },

    //关键字全局搜索
    async search(keyword) {
      const res = await globalSeach(keyword);
      this.searchList = res.data;
      this.searchList.newsList = findUserNameById(
        this.userList,
        res.data.newsList
      );
    },
    //改变当前搜索结果列表
    changeSearchList(list) {
      this.searchList = list;
    },
  },
});

export default useHomeStore;
