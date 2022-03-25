<template>
  <div class="Head-container">
    <!-- 导航页 -->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fff"
      text-color="#000000"
      active-text-color="#409EFF"
      :default-active="$route.path"
    >
      <el-menu-item index="/home/homemsg"
        ><router-link to="/home/homemsg" class="link"
          >主页</router-link
        ></el-menu-item
      >
      <el-menu-item index="/home/calculation"
        ><router-link to="/home/calculation" class="link"
          >高数计算</router-link
        ></el-menu-item
      >
      <el-submenu index="2">
        <template slot="title">高数绘图</template>
        <el-menu-item index="2-1"
          ><router-link to="/home/paint2D" style="text-decoration: none; color:#000000"
            >二维高数绘图</router-link
          ></el-menu-item
        >
        <el-menu-item index="2-2"
          ><router-link to="/home/paint3D" style="text-decoration: none; color:#000000"
            >三维高数绘图</router-link
          ></el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      token: null,
    };
  },
  methods: {
  },
};
</script>

<style lang='less' scoped>
.Head-container {
  .el-menu {
    width: 100%;
    position: fixed;
    border: 0;
    z-index: 1;
    border-bottom: 1px solid rgba(219,220,221);
    .right {
      float: right;
      padding: 28px 5px 0px 0px;
      font-size: 11px;
      color: #909399;
    }
    .el-menu-item {
      .link {
        text-decoration: none;
      }
    }
  }
}
</style>