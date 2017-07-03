<template>
  <div class="TopNav">
    <mu-appbar class="top-nav" :zDepth="0">
      <!--等待添加弹出层按钮-->
      <mu-avatar slot="left"
                 :src="avatar"
                 :size="30"
                 @click="showSidebar_x(true)" />
  
      <div slot="default" class="title">
        <div class="title-message" v-show="titleType === 0">
          <router-link class="title-item" 
               
                tag="span"
                to="/message"
          >消息</router-link>
          <router-link class="title-item" 

                tag="span"
                to="/voip"
          >电话</router-link>
        </div>
        <div class="title-char" v-show="titleType === 1">{{headerTitle}}</div>
      </div>

      <mu-icon slot="right"
               value="add"
                /><!-- @click="showAdd" -->
    </mu-appbar>
  
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'TopNav',
    // data() {
    //   return {
    //   }
    // },
    computed: mapState({
      avatar: state => state.data.self.avatar,
      headerTitle: 'headerTitle',
      titleType: 'titleType'
    }),
    methods: {
      ...mapMutations(['SHOW_SIDEBAR']),
      showSidebar_x(flag) {
        this.SHOW_SIDEBAR({ flag })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/scss/mixin';

  .mu-appbar{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
      
  .mu-avatar{
    margin-left:12px;
  }
  .title{
    margin: 0 auto;
    width: pxrem(94px);
    line-height: pxrem(28px);
    font-size: 0;
    .title-item{
      display: inline-block;
      width: 50%;
      border: 1px solid $color-w;
      font-size: pxrem(14px);
      text-align: center;
      vertical-align: top;
      font-weight: 500;
      color: $color-w;
      &:first-child{
        border-right: none;
        border-radius: 4px 0 0 4px;
      }
      &:last-child{
        border-left: none;
        border-radius: 0 4px 4px 0;
      }
    }
    .title-item.current{
      color: $color-l;
      background-color: $color-w;
    }
  }  
  .title-char{
    font-size: pxrem(14px);
    text-align: center;
    color: $color-w;
  }
</style>

