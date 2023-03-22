import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false });

const baseURL = "http://localhost:8888";
const http = axios.create(
  // 配置对象
  {
    //基础路径
    // baseURL: "",
    baseURL,
    // 请求超时时间5s
    timeout: 5000,
    // withCredentials: true,
  }
);

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以进行操作
http.interceptors.request.use((config) => {
  //config  配置对象
  //进度条动画开始
  nprogress.start();
  return config;
});

//响应拦截器
http.interceptors.response.use(
  (res) => {
    //成功的回调函数
    //进度条动画结束
    nprogress.done();
    return res.data;
  },
  (error) => {
    //失败的回调函数
    return Promise.reject(new Error("faile"));
  }
);

// 对外暴露
export default http;
