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
      <div class="tab tab3" v-show="activeTab === 'photographs'" ref="tab3Wrapper">
        <div calss="photographs-wrapper">
          <div class="photo-wall_cont" v-for="(photoWall, index) in photoWalls">
            <div class="time-box">
              <span class="photo-wall_time" v-cloak>{{photoWall.time | formatDate}}</span>
            </div>
            <div class="photo-box clearfix">
              <div class="photo-wall_img" v-for="(photo, index) in photoWall.photos">
                <mu-card-media>
                  <div class="img-wrapper_triplet" :style="{backgroundImage: `url(${photo.url})`}">
                  </div>
                </mu-card-media>
              </div>
            </div>
          </div>
          <!-- <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/> -->
        </div>
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
import {formatDate} from 'common/js/date';
const ERROR_OK = 0;

export default {
  name: 'PersonInfo',
  data() {
    return {
      initScroll: false,
      activeTab: 'presonInfo',
      userData: {},            // 用户基本数据初始化
      photoWalls: []           // 照片墙数据初始化
    }
  },
  created(){
    // 判断当前页面id入口，没有的话就获取自己的数据，展示个人页面，有的话就展示当前活跃朋友的页面
    if (this.activeId === 0) {
      this.photoWalls = this.data.self.photowalls;
      this.userData = this.data.self;
    } else {
      this.photoWalls = this.friend.photowalls;
      this.userData = this.friend;
    }
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
    // ...mapGetters(['friend'])
  },
  methods: {
    ...mapMutations(['GET_ACTIVEID', 'SHOW_PERSONINFO', 'SHOW_DIALOG']), 
    handleTabChange(val) {
      this.activeTab = val;
      // 判断是否初始化iscroll，否则就刷新
      this.$nextTick(() => {
        if(!this.tab2Scroll||!this.tab3Scroll) {
          this._initScroll();
        }else{
          this.tab2Scroll.refresh();
          this.tab3Scroll.refresh();
        }
      })
    }, 
    _initScroll() {
      this.tab2Scroll = new IScroll(this.$refs.tab2Wrapper);
      this.tab3Scroll = new IScroll(this.$refs.tab3Wrapper);
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
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy / MM / dd');
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
  .tab2, .tab3{
    position: absolute;
    top: pxrem(245px);
    right: 0;
    bottom: 52px;
    left: 0;
    overflow: hidden;
    background-color: #E8E8E8;
  }
  .tab3{background-color: #FFF;}
  .moments-wrapper, .photographs-wrapper{
    width: 100%;
    position: absolute;
    background-color: #E8E8E8;
  }
  .photo-wall_cont{
    padding: 10px;
    .time-box{
      margin-bottom: 15px;
      text-align: center;
    }
    .photo-wall_time{
      display: inline-block;
      position: relative;
      margin: 10px auto;
      line-height: 18px;
      font-size: 18px;
      font-weight: 600;
      color: #666;
      &:before,&:after{
        content:'';
        position: absolute;
        top: 9px;
        width: 20px;
        height: 1px;
        background-color: #999;
      }
      &:before{
        left: -28px;
      }
      &:after{
        right: -28px;
      }
    }
    .photo-box{
      width: 100%;
    }
    .photo-wall_img{
      float: left;
      width: 33%;
      margin: 1px 1px 0 0;
      background-color: #000;
    }
    .img-wrapper_triplet{
      width: 100%;
      padding-top: 100%;
      background-position: center;
      background-size: cover;
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