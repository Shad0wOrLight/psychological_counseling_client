import {
  addArticle,
  addComment,
  getArticleByCondition,
  getCommentByArticleId,
} from "@/http/modules/forum";
import { listOrderByDesc } from "@/utils/format";
import { defineStore } from "pinia";

const useForumStore = defineStore("forum", {
  state: () => ({
    articleList: [], //帖子列表
    currentList: [], //当前分类下帖子列表
    commentList: [], //评论列表
    currentArticle: "", //当前帖子
  }),
  actions: {
    //获取帖子列表
    async getAllArticle() {
      const res = await getArticleByCondition();
      this.articleList = listOrderByDesc(res.data);
      this.changeCurrentList(this.articleList);
    },
    // 改变当前分类下的帖子
    changeCurrentList(list = [], type = "婚恋") {
      list = list.filter((item) => item.type == type);
      this.currentList = listOrderByDesc(list);
    },
    //获取当前帖子详情
    async getCurrentArticle(id) {
      const res = await getArticleByCondition();
      this.currentArticle = res.data.find((item) => item.id == id);
    },
    //获取帖子下评论列表
    async getComment(id) {
      const res = await getCommentByArticleId(id);
      this.commentList = res.data;
    },
    // 发表评论
    async commitComment(data) {
      const res = await addComment(data);
    },
    // 发布帖子
    async commitArticle(data) {
      addArticle(data);
    },
  },
});

export default useForumStore;
