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
        <mu-avatar :src="userData.avatar" />
        <span class="name" v-cloak>{{userData.name}}</span>
      </div>
      <mu-tabs :value="activeTab"
               @change="handleTabChange">
        <mu-tab value="presonInfo"
                title="个人信息" />
        <mu-tab value="moments"
                title="个人动态" />
        <mu-tab value="photographs"
                title="照片墙" />
      </mu-tabs>
    </div>
    <div class="content">
      <div class="tab tab1" v-show="activeTab === 'presonInfo'">
        <div>
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
      </div>
      <div class="tab tab2" v-show="activeTab === 'moments'" ref="tab2Wrapper">
        <div class="moments-wrapper">
          <MomentsCard></MomentsCard>
        </div>
      </div>
      <div class="tab tab3" v-show="activeTab === 'photographs'">
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
              title="语音" />
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
import { mapState, mapGetters, mapMutations } from 'vuex';
import MomentsCard from 'components/MomentsCard/MomentsCard';
import IScroll from 'iscroll';
const ERROR_OK = 0;

export default {
  name: 'PersonInfo',
  data() {
    return {
      initScroll: false,
      activeTab: 'presonInfo',
      horzObj: {}           // 默认单张图片是水平默认80%显示 style默认为空
    }
  },
  created(){

  },
  mounted() {
    // this.$http.get('/api/goods').then(res =>{
    //   return res.json();
    // }).then(json => {
    //   if(json.errno === ERROR_OK) {
    //     // this.goods = json.data;
    //     // console.log(this.goods) 
    //     this.$nextTick(() => {
    //       this._initScroll();
    //       this._calculateHeight();
    //     })
    //   }
    // })
       
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
      this.activeTab = val;
      // 判断是否初始化iscroll，否则就刷新
      this.$nextTick(() => {
        if(!this.tab2Scroll) {
          this.tab2Scroll = new IScroll(this.$refs.tab2Wrapper);
        }else{
          this.tab2Scroll.refresh();
        }
      })
    }, 
    _initScroll() {
      this.tab2Scroll = new IScroll(this.$refs.tab2Wrapper);
    },
    _showPersonInfo() {
      this.GET_ACTIVEID({ activeId: 0 });
      this.SHOW_PERSONINFO();
    },
    _showDialog() {
      // 判定打开的是不是自己的主页，如果是则屏蔽和自己的对话
      if (this.activeId !== 0) {
        this.SHOW_DIALOG();
        this.SHOW_PERSONINFO();
      }
    }
  },
  components: {
    MomentsCard
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
    height: pxrem(245px);
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
        width: pxrem(90px);
        height: pxrem(90px);
        &:after{
          content: '';
          position: absolute;
          top: pxrem(-3px);
          left: pxrem(-3px);
          width: pxrem(96px);
          height: pxrem(96px);
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
  .tab2{
    position: absolute;
    top: pxrem(245px);
    right: 0;
    bottom: 52px;
    left: 0;
    overflow: hidden;
    background-color: #E8E8E8;
    .moments-wrapper{
      width: 100%;
      position: absolute;
      background-color: #E8E8E8;
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