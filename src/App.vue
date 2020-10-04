<template>
  <div class="app-frame-out">
    <headerTop v-show="showHead" ref="header"></headerTop>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footerBar></footerBar>
    <!--     
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      showHead: true,
      noHeads: ["login", "home", "regsuccess"],
    };
  },
  provide() {
    return {
      fooMethod: () => {
        this.$refs.header.onClickRight(fn);
        console.log("父组件 fooMethod被调用");
      },
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        console.log(newVal);
        if (this.noHeads.includes(newVal.name)) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
