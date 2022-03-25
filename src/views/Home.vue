<template>
  <div class="Home-container" >
    <Head></Head>
    <div style="height: 100%">
      <router-view></router-view>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Bottom from "@/components/Bottom.vue";
export default {
  name: "Home",
  components: {
    Head,
    Bottom,
  },
};
</script>

<style lang='less' scoped>
</style>