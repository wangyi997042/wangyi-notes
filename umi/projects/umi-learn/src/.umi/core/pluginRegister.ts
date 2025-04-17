// @ts-nocheck
import { plugin } from './plugin';
import * as Plugin_0 from '../../app.ts';
import * as Plugin_1 from '/Users/wangwang/Documents/开发/全/前端/xue/react/umi-learn/src/.umi/plugin-access/rootContainer.ts';
import * as Plugin_2 from '../plugin-initial-state/runtime';
import * as Plugin_3 from '../plugin-model/runtime';
import * as Plugin_4 from '@@/plugin-qiankun/masterRuntimePlugin';

  plugin.register({
    apply: Plugin_0,
    path: '../../app.ts',
  });
  plugin.register({
    apply: Plugin_1,
    path: '/Users/wangwang/Documents/开发/全/前端/xue/react/umi-learn/src/.umi/plugin-access/rootContainer.ts',
  });
  plugin.register({
    apply: Plugin_2,
    path: '../plugin-initial-state/runtime',
  });
  plugin.register({
    apply: Plugin_3,
    path: '../plugin-model/runtime',
  });
  plugin.register({
    apply: Plugin_4,
    path: '@@/plugin-qiankun/masterRuntimePlugin',
  });

export const __mfsu = 1;
