<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="nodeClick">测试登录接口</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    sessionStorage.setItem("parameters", "111");
  },
  computed: {
    ...mapGetters({
      parameters: (state) => state.base.parameters,
    }),
  },
  methods: {
    ...mapMutations(["base/setParameters"]),
    nodeClick() {
      this.$axios
        .get(this.$api.login, {
          // phone: 17858804744,
          phone: "17858804744",
          password: "z17858804744",
        })
        .then((res) => {
          this["base/setParameters"]({ phone: 17858804744 });
          this.$router.push({
            name: "grapher",
            // path: "/photo/grapher",
            params: {
              phone: 17858804744,
            },
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
