import { defineStore } from "pinia";
import {
  userLogin,
  userRegister,
  editUser,
  getUserList,
} from "@/http/modules/user";
import { saveUserInfo, getUserInfo, userLogout } from "@/utils/storage";
import { getTestRecord } from "@/http/modules/evaluation";
import {
  deleteArticle,
  deleteComment,
  getArticleByCondition,
  getCommnetByUserId,
} from "@/http/modules/forum";
import { init, websocketClose } from "@/utils/websocket";

const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: getUserInfo() ?? "", // 用户信息
    consultantList: [], //咨询师列表
    currentList: [], //当前分类下咨询师列表
    evaluationRecordList: [], //测评记录列表
    articleList: [], //帖子列表
    commentList: [], //评论列表
  }),
  actions: {
    //登录
    async login(user) {
      const res = await userLogin(user);
      if (!res.data) {
        return Promise.reject("用户名或密码错误！");
      }
      this.userInfo = res.data;
      saveUserInfo(res.data);
      // init(res.data.uid);
    },
    //注册
    async register(user) {
      userRegister(user);
    },
    //注销
    logout() {
      userLogout();
      websocketClose();
    },
    //修改信息
    updateUserInfo(data) {
      editUser(data).then(async () => {
        const userList = await getUserList({ uid: data.uid });
        this.userInfo = userList.data[0];
        saveUserInfo(userList.data[0]);
      });
    },
    //获取咨询师列表
    async getConsultantList(data = {}) {
      const res = await getUserList({ ...data, role: 1 });
      this.consultantList = res.data;
      this.currentList = res.data;
    },
    //改变当前分类下咨询师列表
    changeCurrenttList(list) {
      this.currentList = list;
    },
    //获取用户测评记录
    async getUserEvaluationRecordList() {
      const res = await getTestRecord(this.userInfo.uid);
      this.evaluationRecordList = res.data;
    },
    //获取用户帖子
    async getUserArticleList() {
      const res = await getArticleByCondition({ authorId: this.userInfo.uid });

      this.articleList = res.data;
    },
    //获取用户评论
    async getUserCommentList() {
      const res = await getCommnetByUserId(this.userInfo.uid);
      this.commentList = res.data;
    },
    //删除帖子
    async deleteUserArticle(id) {
      deleteArticle(id).then(async () => {
        const res = await getArticleByCondition({
          authorId: this.userInfo.uid,
        });
        this.articleList = res.data;
      });
    },
    //删除评论
    async deleteUserComment(id) {
      deleteComment(id).then(async () => {
        const res = await getCommnetByUserId(this.userInfo.uid);
        this.commentList = res.data;
      });
    },
  },
});

export default useUserStore;
