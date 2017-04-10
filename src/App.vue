<template>
  <div id="app">
    <!--头部导航-->
    <div class="header">
      <!--弹出层控制按钮-左边框弹出-->
      <!-- <div class="drawer"
           @click="showSidebar(true)"></div> -->
      <!-- <top-nav></top-nav> -->
    </div>
    <!--内容-->
    <!-- <div class="container-content">
      <div class="patch"></div>
      <router-view></router-view>
      <div class="patch"></div>
    </div>
    尾部tab
    <div class="container-bottom">
      <bottom-tab class="tab"></bottom-tab>
    </div>
      
    主页左侧弹出层
    <my-sidebar></my-sidebar>
    对话界面
    <my-dialog class="my-dialog"
               v-if="dialog"></my-dialog>
    个人主页
    <my-personindex class="my-personindex"
                    v-if="personindex"></my-personindex>
    搜索
    <my-search v-if="search"></my-search> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped>
  @import 'common/scss/mixin';
  // 按设计稿大小除以4.8 因为是截图于ip6plus 除于3发现还是偏大，4.8正好和手机显示一致
  .header{
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    width: 100%;
    height: pxrem(40px);
    background-color: seagreen;
  }
    

</style>
