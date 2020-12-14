<template>
  <div class="pageContainer">
    <div class="countDown" v-show="addBackGround">
      <span class="jump" @click="jump">点击跳转</span>
    </div>
  </div>
</template>
<script>
export default {
  name:"Login",
  data() {
    return {
      addBackGround: true,
    };
  },
  methods: {
    jump() {
      this.addBackGround = false;
    },
  },
};
</script>
<style lang="less" scoped>
.pageContainer {
  height: 100%;
  .countDown {
    height: 100%;
    width: 100%;
    background: url(~@/assets/images/bg.jpg);
    background-position: center;
    background-size: cover;
    .jump {
      padding: 10px 20px;
    }
  }
}
</style>