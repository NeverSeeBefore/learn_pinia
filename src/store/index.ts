import { defineStore } from "pinia";

export const usePiniaStore = defineStore({
  id: "app",
  state: () => {
    return {
      tip: "using pinia",
      book: {
        B1: 0,
        B2: 0,
        B3: 0,
        B4: 0,
        B5: 0,
      },
      list: [
        {
          name: "iitem1",
          count: 0,
        },
        {
          name: "iitem2",
          count: 0,
        },
        {
          name: "iitem3",
          count: 0,
        },
      ],
    };
  },
  getters: {
    // total: (state) => {
    //   return (
    //     state.list.reduce((prev, cur) => {
    //       return prev + cur.count;
    //     }, 0) +
    //     Object.values(state.book).reduce((prev, cur) => {
    //       return prev + cur;
    //     }, 0)
    //   );
    // },
    total(): number {
      return (
        this.list.reduce((prev, cur) => {
          return prev + cur.count;
        }, 0) +
        Object.values(this.book).reduce((prev, cur) => {
          return prev + cur;
        }, 0)
      );
    },
  },
  actions: {
    async changeTips(newTip: string) {
      this.tip = await new Promise((reslove) => {
        setTimeout(() => {
            reslove(newTip || '-----default-----');
        }, 3000)
      })
    },
    async testAxios() {
        console.log('test axios !!!', this.axios);
    },
  },
});
