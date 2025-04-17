// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/wangwang/Documents/开发/全/前端/xue/react/umi-learn/node_modules/.pnpm/@umijs+runtime@3.5.41_react@16.14.0/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "name": "首页",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'@/pages/index')}),
    "exact": true
  },
  {
    "path": "/foo",
    "name": "foo",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__foo__index' */'@/pages/foo/index')}),
    "exact": true
  },
  {
    "path": "/bar",
    "name": "bar",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__bar__index' */'@/pages/bar/index')}),
    "exact": true
  },
  {
    "path": "/app2",
    "microApp": "app2",
    "microAppProps": {
      "a": 111
    },
    "exact": false,
    "component": (() => {
          const { getMicroAppRouteComponent } = umiExports;
          return getMicroAppRouteComponent({ appName: 'app2', base: '/admin/', masterHistoryType: 'browser', routeProps: {'settings':{},'a':111} })
        })()
  },
  {
    "path": "/app3",
    "microApp": "iyb-generate-web",
    "exact": false,
    "component": (() => {
          const { getMicroAppRouteComponent } = umiExports;
          return getMicroAppRouteComponent({ appName: 'iyb-generate-web', base: '/admin/', masterHistoryType: 'browser', routeProps: {'settings':{}} })
        })()
  },
  {
    "path": "/renewal",
    "microApp": "wangyi-project",
    "exact": false,
    "component": (() => {
          const { getMicroAppRouteComponent } = umiExports;
          return getMicroAppRouteComponent({ appName: 'wangyi-project', base: '/admin/', masterHistoryType: 'browser', routeProps: {'settings':{}} })
        })()
  },
  {
    "path": "/app5",
    "microApp": "iyb-micro-product-pc",
    "exact": false,
    "component": (() => {
          const { getMicroAppRouteComponent } = umiExports;
          return getMicroAppRouteComponent({ appName: 'iyb-micro-product-pc', base: '/admin/', masterHistoryType: 'browser', routeProps: {'settings':{}} })
        })()
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
