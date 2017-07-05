<template>
  <mu-drawer :open="sidebar.open"
             :docked="sidebar.docked"
             @close="SHOW_SIDEBAR()">
  
    <div class="content" :style="{backgroundImage: `url(${self.background})`}">
  
      <div class="top">
        <mu-avatar :src="self.avatar"
                   :size="48"
                   @click="showPersonindex_x" />
        <span class="name">{{self.name}}</span>
        <div class="explain">{{self.explain}}</div>
      </div>
  
    </div>
  
    <mu-list-item title="我的相册">
      <mu-icon slot="left"
               value="photo_library"
               color="#5F6379" />
    </mu-list-item>
    <mu-list-item title="个性装扮">
      <mu-icon slot="left"
               value="palette"
               color="#5F6379" />
    </mu-list-item>
    <mu-list-item title="我的收藏">
      <mu-icon slot="left"
               value="assistant"
               color="#5F6379" />
    </mu-list-item>
    <mu-list-item title="我的文件">
      <mu-icon slot="left"
               value="folder"
               color="#5F6379" />
    </mu-list-item>
  
    <mu-list-item title="关闭"
                  @click.native="SHOW_SIDEBAR()">
      <mu-icon slot="left"
               value="close"
               color="#5F6379" />
    </mu-list-item>
  </mu-drawer>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SideBar',
  computed: {
    sidebar() {
      return this.$store.state.sidebar
    },
    self() {
      return this.$store.state.data.self
    }
  },
  methods: {
    ...mapMutations(['SHOW_SIDEBAR', 'SHOW_PERSONINFO']),
    showPersonindex_x() {
      this.SHOW_SIDEBAR()
      this.SHOW_PERSONINFO()
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../../common/scss/mixin';

.mu-drawer{
  color: $color-b;
  .content{
    position: relative;
    // height: pxrem(200px);
    padding-top: pxrem(94px);
    margin-bottom: 20px;
    background-size: 140%;
    background-position: center -80px;
    color: #FFF;
    .top{
      padding: 20px;
      .name{
        margin: 8px 0 0 4px;
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
      }
    }
    .explain{
      margin-top: 5px;
      padding-left: 10px;
      color: #FFf;
    } 
  }
} 
</style>
