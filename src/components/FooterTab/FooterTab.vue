<template>
  <keep-alive>
    <mu-bottom-nav :value="activeTab"
                   @change="handleChange"
                   class="bottom-tab">
    
      <mu-bottom-nav-item value="message"
                          title="消息"
                          :icon="icon[0]" />
    
      <mu-bottom-nav-item value="friend"
                          title="联系人"
                          :icon="icon[1]" />
    
      <mu-bottom-nav-item value="discover"
                          title="动态"
                          :icon="icon[2]" />
    
    </mu-bottom-nav>
  </keep-alive>
</template>

<script>
  export default {
    name: 'FooterTab',
    data() {
      return {
        activeTab: 'message',
        tabType: ['message','friend','discover']
      }
    },
    computed:{
      icon() {
        if(this.activeTab === this.tabType[0]) {
          return ['chat_bubble','person_outline','star_border'];
        }else if(this.activeTab === this.tabType[1]) {
          return ['chat_bubble_outline','person','star_border'];
        }else if(this.activeTab === this.tabType[2]) {
          return ['chat_bubble_outline','person_outline','star'];
        }
      }
    },
    methods: {
      // 点击按钮
      handleChange(val) {
        let text,num;
        this.activeTab = val;

        // 路由跳转至当前点击的页面，这里用replace是因为用push的话，回退的时候状态不会切换
        this.$router.replace(val);
        // 改变title
        if(val === this.tabType[0]){
          num = 0;
        }else if(val === this.tabType[1]) {
          text = '联系人';
          num = 1;
        }else if(val === this.tabType[2]) {
          text = '动态';
          num = 1;
        }
        this.$store.commit('CHANGE_TITLE', { title: text, type: num});
      }
    }
  }
</script>

<style scoped>
  .bottom-tab{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
<style lang="scss">
  @import '../../common/scss/mixin';
  .bottom-tab .mu-bottom-item-icon{
    width: pxrem(30px);
  }
  .bottom-tab .mu-icon{
    font-size: pxrem(30px);
  }
  .bottom-tab .mu-bottom-item-active .mu-bottom-item-text{
    font-size: 12px;
  }
</style>
