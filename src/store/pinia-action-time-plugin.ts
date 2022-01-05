// 通过一些底层 API，我们能够各种各样的扩展：

import { PiniaPluginContext } from "pinia";

// 给 store 添加新的属性；
// 给 store 添加新的选项；
// 给 store 添加新的方法；
// 包装已经存在的方法；
// 修改或者删除 actions；
// 基于特定的 store 做扩展；

export default function piniaActionTimePlugin(context: PiniaPluginContext) {
  const { store } = context;
  const unsubscribe = store.$onAction(
    ({ name, store, args, after, onError }) => {
      const startTime = Date.now();
      console.log(`Start "${name}" with params [${args.join(", ")}].`);
      after((result) => {
        console.log(
          `Finished "${name}" after ${
            Date.now() - startTime
          }ms.\nResult: ${result}.`
        );
      });
      onError((error) => {
        console.warn(
          `Failed "${name}" after ${
            Date.now() - startTime
          }ms.\nError: ${error}.`
        );
      });
    }
  );
}
