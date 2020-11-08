<template>
  <div>
    <button style="margin-top: 100px" @click="handleClick">回到home</button>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["parameters"]),
  },
  created() {
    console.log(this.$route.params);
    console.log(this.$store.state.parameters);
    console.log(this.parameters);
  },
  methods: {
    ...mapMutations(["setParameters"]),
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