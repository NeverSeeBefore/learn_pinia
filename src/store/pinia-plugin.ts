// 通过一些底层 API，我们能够各种各样的扩展：

import axios from "axios";
import { PiniaPluginContext } from "pinia";
import { markRaw } from "vue";

// 给 store 添加新的属性；
// 给 store 添加新的选项；
// 给 store 添加新的方法；
// 包装已经存在的方法；
// 修改或者删除 actions；
// 基于特定的 store 做扩展；

export default function piniaPlugin(context: PiniaPluginContext) {
    const {app, options, pinia, store} = context
    console.log('pinia-plugin args \n', context, app, options, pinia, store);
    store.axios = markRaw(axios);

    axios.get('https://www.baidu.com/s?wd=11111').then(res => {
        console.log('res', res);;
    }).catch(err => {
        console.log('err', err);
    })
}