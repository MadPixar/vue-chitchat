<template>
  <div class="info">
    <div class="top"
         :style="{backgroundImage: `url(${userData.background})`}">
  
      <mu-appbar title="返回"
                 :titleClass="`title-fz`"
                 :zDepth="0">
        <mu-icon-button icon="arrow_back"
                        slot="left"
                        :iconClass="`arrow_back`"
                        @click="_showPersonInfo" />
        <div class="right-top"
             slot="right">
          <mu-icon-button icon="more_vert" />
        </div>
      </mu-appbar>
  
      <div class="mu-middle">
        <mu-avatar :src="userData.avatar"
                   :size="96" />
        <span class="name" v-cloak>{{userData.name}}</span>
      </div>
      <mu-tabs :value="activeTab"
               @change="handleTabChange">
        <mu-tab value="tab1"
                title="个人信息" />
        <mu-tab value="tab2"
                title="动态" />
        <mu-tab value="tab3"
                title="照片墙" />
      </mu-tabs>
    </div>
    <div class="content">
      <div class="tab1" v-if="activeTab === 'tab1'">
        <div class="item">
          <mu-list-item title="联系方式"
                        :describeText="userData.phone"
                        disabled>
            <mu-icon value="phone"
                     color="#2196F3"
                     slot="left" />
          </mu-list-item>
          <mu-divider inset/>
        </div>
        <div class="item">
          <mu-list-item title="邮箱"
                        :describeText="userData.email"
                        disabled>
            <mu-icon value="email"
                     color="#2196F3"
                     slot="left" />
          </mu-list-item>
          <mu-divider inset/>
        </div>
        <div class="item">
          <mu-list-item title="地址"
                        :describeText="userData.address"
                        disabled>
            <mu-icon value="location_on"
                     color="#2196F3"
                     slot="left" />
          </mu-list-item>
          <mu-divider inset/>
        </div>
        <div class="item">
          <mu-list-item title="生日"
                        :describeText="userData.birthday"
                        disabled>
            <mu-icon value="cake"
                     color="#2196F3"
                     slot="left" />
          </mu-list-item>
          <mu-divider inset/>
        </div>
      </div>
      <div class="tab2" v-if="activeTab === 'tab2'">
        <div class="moments-info" v-for="">
          <mu-card>
            <mu-card-header title="Myron Avatar" subTitle="sub title">
              <mu-avatar src="/images/uicon.jpg" slot="avatar"/>
            </mu-card-header>
            <mu-card-media title="Image Title" subTitle="Image Sub Title">
              <img src="/images/sun.jpg" />
            </mu-card-media>
            <mu-card-title title="Content Title" subTitle="Content Title"/>
            <mu-card-text>
              散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
              调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
              似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
              找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
            </mu-card-text>
            <mu-card-actions>
              <mu-flat-button label="Action 1"/>
              <mu-flat-button label="Action 2"/>
            </mu-card-actions>
          </mu-card>
        </div>
      </div>
      <div class="tab3" v-if="activeTab === 'tab3'">
        <h1>未完待续....</h1>
      </div>
    </div>
  
    <mu-tabs class="bottom border-t-1px">
      <mu-tab value="tab1"
              icon="videocam"
              :titleClass="`bottom-color bottom-fz`"
              :iconClass="`bottom-color`"
              title="视频" />
      <mu-tab value="tab2"
              icon="phone_in_talk"
              :titleClass="`bottom-color bottom-fz`"
              :iconClass="`bottom-color`"
              title="电话" />
      <mu-tab value="tab3"
              icon="sms"
              :titleClass="`bottom-color bottom-fz`"
              :iconClass="`bottom-color`"
              title="发消息"
              @click="_showDialog" />
    </mu-tabs>
  
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'PersonInfo',
  data() {
    return {
      activeTab: 'tab1'
    }
  },
  computed: {
    ...mapState(['activeId', 'data']),
    // ...mapGetters(['friend']),
    userData() {
      // 判断是否有当前活跃的friend，没有的话就获取自己的数据，展示个人页面，有的话就展示当前活跃朋友的页面
      if (this.activeId === 0) {
        return this.data.self
      } else {
        return this.friend
      }
    }
  },
  methods: {
    ...mapMutations(['GET_ACTIVEID', 'SHOW_PERSONINFO', 'SHOW_DIALOG']), 
    handleTabChange(val) {
      this.activeTab = val
    },
    _showPersonInfo() {
      this.GET_ACTIVEID({ activeId: 0 })
      this.SHOW_PERSONINFO()
    },
    _showDialog() {
      // 判定打开的是不是自己的主页，如果是则屏蔽和自己的对话
      if (this.activeId !== 0) {
        this.SHOW_DIALOG()
        this.SHOW_PERSONINFO()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/mixin';
.info {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #FFF;
  
  .top {
    position: relative;
    height: pxrem(254px);
    background-size: cover;
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(44,51,95,.2);
      content: '';
    }
    .mu-middle {
      position: absolute;
      z-index: 1;
      width: 100%;
      text-align: center;
      .mu-avatar{
        position: relative;
        &:after{
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          width: 102px;
          height: 102px;
          background-color: rgba(225,255,255,.7);
          border-radius: 50%;
          z-index: -1;
        }
      }
      .name {
        display: block;
        margin-top: 4px;
        font-size: 1.6em;
        color: #fff;
      }
    }
    .mu-appbar {
      position: relative;
      z-index:1;
      background:rgba(0,0,0,0);
    }
    .mu-tabs {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      background:rgba(0,0,0,0);
    }
  }
  .content {
    .item {
      margin-top: 6px;
      margin-left: 20px;
    }
  }
  .bottom {
    @include border-t-1px(#EAEAEA);
    position: absolute;
    left: 0;
    bottom: 0;
    background: #FAFAFA;
  }
}

</style>