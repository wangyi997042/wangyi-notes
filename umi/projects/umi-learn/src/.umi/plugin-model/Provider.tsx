// @ts-nocheck
import React from 'react';
import initialState from '/Users/wangwang/Documents/开发/全/前端/xue/react/umi-learn/src/.umi/plugin-initial-state/models/initialState';
import { useQiankunStateForSlave } from '/Users/wangwang/Documents/开发/全/前端/xue/react/umi-learn/src/app';
import model0 from "/Users/wangwang/Documents/开发/全/前端/xue/react/umi-learn/src/models/useAuthModel";
// @ts-ignore
import Dispatcher from './helpers/dispatcher';
// @ts-ignore
import Executor from './helpers/executor';
// @ts-ignore
import { UmiContext } from './helpers/constant';

export const models = { '@@initialState': initialState, '@@qiankunStateForSlave': useQiankunStateForSlave, 'useAuthModel': model0 };

export type Model<T extends keyof typeof models> = {
  [key in keyof typeof models]: ReturnType<typeof models[T]>;
};

export type Models<T extends keyof typeof models> = Model<T>[T]

const dispatcher = new Dispatcher!();
const Exe = Executor!;

export default ({ children }: { children: React.ReactNode }) => {

  return (
    <UmiContext.Provider value={dispatcher}>
      {
        Object.entries(models).map(pair => (
          <Exe key={pair[0]} namespace={pair[0]} hook={pair[1] as any} onUpdate={(val: any) => {
            const [ns] = pair as [keyof typeof models, any];
            dispatcher.data[ns] = val;
            dispatcher.update(ns);
          }} />
        ))
      }
      {children}
    </UmiContext.Provider>
  )
}
