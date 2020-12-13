<template>
  <div class="app-frame-out">
    <!-- 将公共的头部和尾部提取出来 使用vuex管理状态 -->
    <!-- header start -->
    <headerTop v-show="showHead" ref="header"></headerTop>
    <!-- header end -->

    <!-- content start -->
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- content end -->

    <!-- footer start -->
    <footerBar></footerBar>
    <!-- footer end -->

    <!-- 
      分别在组件中写页面的 头部和尾部，方便交互
      <div id="nav">
        <router-link to="/">Home</router-link> 
        <router-link to="/about">About</router-link>
      </div>
      <router-view/> 
    -->
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
    //写在最外层的组件中 方便传递到更深嵌套的组件里 但是有参数传递的难题
    return {
      fooMethod: (fn) => {
        this.$refs.header.onClickRight(fn);
      },
    };
  },
  watch: {
    //监听路由变化 实现部分页面头部和尾部的显示隐藏
    $route: {
      handler(newVal) {
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
    //进入页面时判断 恢复vuex管理状态到刷新之前
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在浏览器窗口关闭或刷新时 会触发beforeunload事件
    window.addEventListener("beforeunload", () => {
      window.alert("111");
      console.log("111");
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
.app-frame-out {
  .content {
    flex: 1;
  }
}
</style>
