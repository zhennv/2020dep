<template>
  <div class="header">
    <i class="iconfont icon-icon_return" @click="onClickLeft"></i>
    <span>{{ header.title }}</span>
    <i class="iconfont" :class="header.rightIcon" @click="onClickRight"></i>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "headerTop",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      header: (state) => state.base.header,
    }),
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$store.commit("base/updateHeader", { rightClicked: true });
    },
  },
};
</script>
<style lang="less" scoped>
</style>