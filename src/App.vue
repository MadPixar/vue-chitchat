<template>
  <div id="app">
    <!--头部导航-->
    <div class="header">
      <!--顶部导航组件-->
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
    <SideBar></SideBar>
    <!-- 对话界面 -->
    <!-- <my-dialog class="my-dialog"
               v-if="dialog"></my-dialog> -->
    <!-- 个人主页 -->
    <PersonInfo class="personinfo"
                v-if="personinfo"></PersonInfo>
    <!-- 搜索 -->
    <!-- <my-search v-if="search"></my-search> -->
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import TopNav from 'components/TopNav/TopNav'
  import FooterTab from 'components/FooterTab/FooterTab'
  import SideBar from 'components/SideBar/SideBar'
  import PersonInfo from 'components/PersonInfo/PersonInfo'

  export default {
    name: 'app',
    components: {
      TopNav,
      FooterTab,
      SideBar,
      PersonInfo
    },
    // mapState是vuex的方法之一
    computed: mapState(['personinfo'])
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/mixin';
  // 按设计稿大小除以4.5 因为是截图于6P 除于3发现还是偏大，4.5正好和手机效果显示一致
  #app{
    width: 100%;   
    min-height: 100vh;
    background-color: $color-g;
  }
  .header{
    position: fixed;
    z-index: 99;
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
