<template>
  <div class="HomeMsg-container">
    <div class="welcomeText"
       :style="{backgroundImage:'url(' + imgSrc + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
      <h2>欢迎使用</h2>
      <h1>智能高数绘图计算辅助器</h1>
      <el-row>
        <el-button type="primary" @click="toUse">开始使用</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeMsg",
  data() {
    return {
      imgSrc: require("@/assets/banner.jpg"),
    };
  },
  methods:{
    toUse(){
      this.$router.push('/home/calculation')
    }
  },
};
</script>

<style lang='less' scoped>
.HomeMsg-container {
  .welcomeText {
    padding: 170px 0px 0px 230px;
    height:100vh;
    h2 {
      font-size: 2.3em;
      color: #fff;
      padding: 0 0em 0.4em 0;
      font-weight: 600;
      letter-spacing: 2px;
      border-bottom: 1px solid #01edc9;
      display: inline-block;
    }
    h1 {
      font-size: 5em;
      color: #fff;
      margin: 0px 0px 45px 0px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  }
}
</style>