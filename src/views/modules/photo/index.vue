<template>
  <div>
    <button @click="handleClick">回到home</button>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    // ...mapGetters("base", ["parameters"]),
    //mapGetters 的实现也和 mapState 很类似，不同的是它的 val 不能是函数，只能是一个字符串
    ...mapGetters({
      parameters: "base/parameters",
    }),
  },
  mounted() {
    // console.log(this.$route.params);
    // console.log(this.$store.state.base.parameters);
    console.log(this.parameters);
  },
  methods: {
    ...mapMutations("base", ["setParameters"]),
    handleClick() {
      this.$router.push({
        name: "home",
        params: {
          name: "lixinhua",
        },
      });
      this.setParameters({ name: "lixinhua" });
    },
  },
};
</script>
<style lang="less">
</style>