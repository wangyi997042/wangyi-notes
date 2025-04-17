//plugins/plugin01.ts
import { IApi } from 'umi';
// 插件模块默认接收一个参数api 里面有各种hook可供调用
export default function (api: IApi) {

  return {
    plugins: [
      require.resolve('../plugins/plugin01'),
      require.resolve('../plugins/plugin02'),
    ]
  }
}
