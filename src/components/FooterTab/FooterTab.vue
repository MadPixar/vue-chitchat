<template>
  <mu-bottom-nav :value="activeTab"
                 @change="handleChange"
                 class="bottom-tab">
  
    <mu-bottom-nav-item value="message"
                        title="消息"
                        :icon="icon[0]" />
  
    <mu-bottom-nav-item value="friends"
                        title="联系人"
                        :icon="icon[1]" />
  
    <mu-bottom-nav-item value="discover"
                        title="动态"
                        :icon="icon[2]" />
  
  </mu-bottom-nav>
</template>

<script>
  export default {
    name: 'FooterTab',
    data() {
      return {
        activeTab: 'message'
      }
    },
    computed:{
      icon() {
        if(this.activeTab === 'message') {
          return ['chat_bubble','person_outline','star_border'];
        }else if(this.activeTab === 'friends') {
          return ['chat_bubble_outline','person','star_border'];
        }else if(this.activeTab === 'discover') {
          return ['chat_bubble_outline','person_outline','star'];
        }
      }
    },
    methods: {
      // 点击按钮
      handleChange(val) {
        let text,num;
        this.activeTab = val;
        console.log()
        // 路由跳转至当前点击的页面
        this.$router.push(val);
        // 改变title
        if(val === 'message'){
          num = 0;
        }else if(val === 'friends') {
          text = '联系人';
          num = 1;
        }else if(val === 'discover') {
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
