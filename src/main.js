import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "normalize.css"; //重置样式
import "./assets/css/index.css";
import pinia from "./stores"; //状态管理库
import { Toast } from "vant";
import "vant/lib/index.css"; //组件库样式

createApp(App).use(router).use(pinia).use(Toast).mount("#app");
