import { createRouter, createWebHashHistory } from "vue-router";
import { getUserInfo } from "@/utils/storage";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/views/home/home.vue"),
    meta: {
      showTabBar: true,
    },
  },
  {
    path: "/message",
    component: () => import("@/views/message/message.vue"),
    meta: {
      showTabBar: true,
    },
  },
  {
    path: "/message/info/:id",
    name: "messageInfo",
    component: () => import("@/views/message/cpns/message-info.vue"),
  },
  {
    path: "/forum",
    component: () => import("@/views/forum/forum.vue"),
    meta: {
      showTabBar: true,
    },
  },
  {
    path: "/forum/article/:id",
    component: () => import("@/views/forum/cpns/article-details.vue"),
  },
  {
    path: "/article/add",
    component: () => import("@/views/forum/cpns/add-article.vue"),
  },
  {
    path: "/user",
    component: () => import("@/views/user/user.vue"),
    meta: {
      showTabBar: true,
    },
  },
  {
    path: "/user/evaluation",
    component: () => import("@/views/user/cpns/user-evaluation.vue"),
  },
  {
    path: "/user/article",
    component: () => import("@/views/user/cpns/user-article.vue"),
  },
  {
    path: "/userDetails",
    component: () => import("@/views/user/cpns/user-details.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/login/register.vue"),
  },
  {
    path: "/news",
    name: "news",
    component: () => import("@/views/news/news.vue"),
  },
  {
    path: "/news/details",
    name: "newsDetails",
    component: () => import("@/views/news/cpns/news-details.vue"),
  },
  {
    path: "/evaluation",
    component: () => import("@/views/evaluation/evaluation.vue"),
  },
  {
    path: "/evaluation/details",
    name: "evaluationDetails",
    component: () => import("@/views/evaluation/cpns/evaluation-details.vue"),
  },

  {
    path: "/evaluation/details/type/:type",
    component: () => import("@/views/evaluation/cpns/evaluation-type-show.vue"),
  },
  {
    path: "/evaluation/test",
    component: () => import("@/views/evaluation/cpns/evaluation-test.vue"),
  },
  {
    path: "/consult",
    component: () => import("@/views/consult/consult.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name == "messageInfo") {
      return {
        top: 2000000,
      };
    } else {
      // 始终滚动到顶部
      return { top: 0 };
    }
  },
});
router.beforeEach(async (to, from, next) => {
  const user = getUserInfo();
  if (to.path == "/login") {
    next();
  } else {
    if (!user) {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});
export default router;
