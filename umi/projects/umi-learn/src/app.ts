
import { useState } from "react";
import { RequestConfig } from 'umi';


export const qiankun = {
  lifeCycles: {
    // 所有子应用在挂载完成时，打印 props 信息
    async afterMount(props) {
      console.log(props);
    },
  },
  async bootstrap(props) {
    console.log('app2 bootstrap', props);

  },
  async mout(props) {
    console.log('app2 mout');

  },
  async unmount(props) {
    console.log('app2 unmount');

  },
}
// src/app.ts
// 传递给子系统的数据
export function useQiankunStateForSlave() {
  const [masterState, setMasterState] = useState({});

  return {
    tesst: 11111,
    masterState,
    setMasterState,
  };
}

// 设置初始化值 配合 @umijs/plugin-model 使用
export async function getInitialState () {
  return {
    initialState: "initialState",
    userId: 'wangyi'
  }
}

const addHost = (url:string, options: any) => {
  // https://oa-test.iyb.tm/editor/product/code.json
  return {
    // url: 'https://wow-test.baoyun.ltd' +url,
    options
  }
}

export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {
    adaptor: (res, req) => {
      console.log('adaptor====', res, req);
      return {
        data: res,
        info: {
          success: false,
          data: res,
          errorMessage: '假的吧',
          showType: 2
        }
      }
    }
  },
  // 请求前 A-C；请求后：C-A
  middlewares: [
    async function middlewareA(ctx, next) {
      console.log('A before');
      await next();
      console.log('A after');
    },
    async function middlewareB(ctx, next) {
      console.log('B before');
      await next();
      console.log('B after');
    },
    async function middlewareC(ctx, next) {
      console.log('C before');
      await next();
      console.log('C after');
    },
  ],
  requestInterceptors: [
    addHost
  ],
  responseInterceptors: [],
};
