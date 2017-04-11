<template>
  <div id="app">
    <!--头部导航-->
    <div class="header">
      <!--弹出层控制按钮-左边框弹出-->
      <!-- <div class="drawer"
           @click="showSidebar(true)"></div> -->
      <TopNav></TopNav>
    </div>
    <!--内容-->
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <!-- 尾部tab -->
    <div class="footer border-t-1px">
      <FooterTab class="tab"></FooterTab>
    </div>
      
    <!-- 主页左侧弹出层 -->
    <!-- <my-sidebar></my-sidebar> -->
    <!-- 对话界面 -->
    <!-- <my-dialog class="my-dialog"
               v-if="dialog"></my-dialog> -->
    <!-- 个人主页 -->
    <!-- <my-personindex class="my-personindex"
                    v-if="personindex"></my-personindex> -->
    <!-- 搜索 -->
    <!-- <my-search v-if="search"></my-search> -->
  </div>
</template>

<script>
  import TopNav from 'components/TopNav/TopNav'
  import FooterTab from 'components/FooterTab/FooterTab'
  export default {
    name: 'app',
    components: {
      TopNav,
      FooterTab
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/mixin';
  // 按设计稿大小除以4.5 因为是截图于ip6plus 除于3发现还是偏大，4.5正好和手机显示一致
  #app{
    width: 100%;   
    min-height: 100vh;
    background-color: $color-g;
  }
  .header{
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    width: 100%;
    height: pxrem(50px);
  }
  .content-wrapper{
    position: absolute;
    top: pxrem(50px);
    bottom: pxrem(60px);
    left: 0;
    width: 100%;
  }
  #app>.footer{
    @include border-t-1px(#BFBFBF);
    position: fixed;
    z-index:1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: pxrem(60px);
    background-color: #FFF;
  } 

</style>
