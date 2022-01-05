<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { storeToRefs } from 'pinia';
import { markRaw } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import { usePiniaStore } from './store';

const store = usePiniaStore();
console.log(store);
// 无响应式
const tip = store.$state.tip;
const tip2 = store.tip;
const tip3 = storeToRefs(store).tip.value;
// 响应式
const tip4 = storeToRefs(store).tip;
const tip5 = storeToRefs(store).tip;
window._store = store;

// 修改值
const { book } = storeToRefs(store);
const batchAdd = function() {
  // 修改的是对象，找得到k的-修改值；找不到k的-新增；没有改动的k-不变；
  store.$patch({
    book: {
      B1: 10,
      B2: 10,
      B3: 10,
      B6: 100
    }
  });
};
const add = function(k: string | Event) {
  console.log(k);
  const key = typeof k === 'object' ? k.target.dataset.key : k;
  store.book[key] ++;
}

const minus = function(k: string) {
  const key = typeof k === 'object' ? k.target.dataset.key : k;
  store.book[key] --;
}

const { list } = storeToRefs(store);


const listBatchAdd = function() {
  // 因为修改的目标是数据，所以原本三项，修改之后变为两项
  store.$patch({
    list: [
      {
          name: 'iitem1',
          count: 10
      },
      {
          name: 'iitem2',
          count: 10
      }
    ]
  });
};
const listAdd = function(item) {
  item.count ++;
}

const listMinus = function(item) {
  item.count --;
}


// subscribe
const unSubScribe = store.$subscribe((mutation, state) => {
  console.log('状态变化', mutation, state);
})

// getters
const { total } = storeToRefs(store);


// onactions
// $onAction 一般是在组件的 setup 建立，它会随着组件的 unmounted 而自动取消。
// 如果你不想让它取消订阅，可以将第二个参数设置为 true：
// store.$onAction(callback, true)
const unsubscribe = store.$onAction(
 ({
    name,
    store,
    args,
    after,
    onError,
  }) => {
    console.log('on action params \n',
    name,
    store,
    args,
    after,
    onError,);
 }
)

// actions
const changeTip = function() {
  store.changeTips('you got a new tip');
}

store.testAxios();
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{total}}</h1>
  <p>{{tip}}</p>
  <p>{{tip2}}</p>
  <p>{{tip3}}</p>
  <p>{{tip4}}</p>
  <p>{{tip5}}</p>
  <p>
    <h3>book list</h3>
    <div v-for="v, k in book">
      {{k}} : {{v}}
      <button :onclick="add" :data-key="k">add</button>
      <button :onclick="minus" :data-key="k">minus</button>
      <button @click="add(k)">add</button>
      <button @click="minus(k)">minus</button>
    </div>
    <div class="options">
      <button @click="batchAdd">batch add</button>
    </div>
  </p>
  <p>
    <h3>book list</h3>
    <div v-for="item in list">
      {{item.name}} : {{item.count}}
      <button @click="listAdd(item)">add</button>
      <button @click="listMinus(item)">minus</button>
    </div>
    <div class="options">
      <button @click="listBatchAdd">batch add</button>
    </div>
  </p>
  <p>
    <button @click="changeTip">change tip</button>
  </p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
