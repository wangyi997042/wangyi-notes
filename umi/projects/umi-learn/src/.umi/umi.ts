// @ts-nocheck
import './core/polyfill';
import '@@/core/devScripts';
import { plugin } from './core/plugin';
import './core/pluginRegister';
import { createHistory } from './core/history';
import { ApplyPluginsType } from '/Users/wangwang/Documents/开发/全/前端/xue/react/umi-learn/node_modules/.pnpm/@umijs+runtime@3.5.41_react@16.14.0/node_modules/@umijs/runtime';
import { renderClient } from '/Users/wangwang/Documents/开发/全/前端/xue/react/umi-learn/node_modules/.pnpm/@umijs+renderer-react@3.5.41_hflg5r6ml7trnjm7sh3tgaza54/node_modules/@umijs/renderer-react/dist/index.js';
import { getRoutes } from './core/routes';




const getClientRender = (args: { hot?: boolean; routes?: any[] } = {}) => plugin.applyPlugins({
  key: 'render',
  type: ApplyPluginsType.compose,
  initialValue: () => {
    const opts = plugin.applyPlugins({
      key: 'modifyClientRenderOpts',
      type: ApplyPluginsType.modify,
      initialValue: {
        routes: args.routes || getRoutes(),
        plugin,
        history: createHistory(args.hot),
        isServer: process.env.__IS_SERVER,
        dynamicImport: true,
        rootElement: 'root-master',
        defaultTitle: `本地使用`,
      },
    });
    return renderClient(opts);
  },
  args,
});

const clientRender = getClientRender();
export default clientRender();


    window.g_umi = {
      version: '3.5.41',
    };
  

// hot module replacement
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./core/routes', () => {
    const ret = require('./core/routes');
    if (ret.then) {
      ret.then(({ getRoutes }) => {
        getClientRender({ hot: true, routes: getRoutes() })();
      });
    } else {
      getClientRender({ hot: true, routes: ret.getRoutes() })();
    }
  });
}
