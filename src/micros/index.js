// index.js
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
  initGlobalState,
} from "qiankun"; // 微应用注册信息
import apps from "./app";

const state = {};
const actions = initGlobalState(state);

registerMicroApps(apps, {
  beforeLoad: (app) => {
    // 加载微应用前，加载进度条
    NProgress.start();
    console.log("before load", app.name);
    return Promise.resolve();
  },
  afterMount: (app) => {
    // 加载微应用前，进度条加载完成
    NProgress.done();
    console.log("after mount", app.name);
    return Promise.resolve();
  },
});

addGlobalUncaughtErrorHandler((event) => {
  console.error(event);
  const { message: msg } = event;
  if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
    console.error("微应用加载失败，请检查应用是否可运行");
  }
});
export default start;
export { actions };
