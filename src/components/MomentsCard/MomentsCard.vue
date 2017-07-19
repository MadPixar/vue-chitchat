<template>
  <div class="moments">
    <div class="moments-card" v-for="(moment, index) in moments">
      <mu-card>
        <mu-card-header :title="moment.name" :subTitle="moment.time | formatDate">
          <mu-avatar :src="moment.avatar" slot="avatar"/>
        </mu-card-header>
        <div class="img-wrapper clearfix">

          <div class="img-one" :style="horzObj" 
                               v-for="(photo, index) in moment.photos" 
                               v-if="moment.photos.length === 1">
            <mu-card-media :title="photo.imgtitle" :subTitle="photo.imgsubtitle">
              <img :src="photo.url" ref="imgOnepic" />
            </mu-card-media>
          </div>

          <div class="img-two" v-for="(photo, index) in moment.photos" 
                               v-if="moment.photos.length === 2||moment.photos.length === 4">
            <mu-card-media :title="photo.imgtitle" :subTitle="photo.imgsubtitle">
              <div class="img-wrapper_double" :style="{backgroundImage: `url(${photo.url})`}">
              </div>
            </mu-card-media>
          </div>

          <div class="img-three" v-for="(photo, index) in moment.photos" 
                                 v-if="moment.photos.length === 3||moment.photos.length === 5||moment.photos.length === 6">
            <mu-card-media :title="photo.imgtitle" :subTitle="photo.imgsubtitle">
              <div class="img-wrapper_triplet" :style="{backgroundImage: `url(${photo.url})`}">
              </div>
            </mu-card-media>
          </div>
          
        </div>
        <!-- <mu-card-title title="Content Title" subTitle="Content Title"/> -->
        <mu-card-text>
          {{moment.text}}
        </mu-card-text>
        <mu-card-actions >
          <mu-flat-button icon="thumb_up" color="#999" :iconClass="`icon-small`"/>
          <mu-flat-button icon="chat" color="#999" :iconClass="`icon-small`"/>
        </mu-card-actions>
      </mu-card>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import {formatDate} from 'common/js/date';

const ERROR_OK = 0;

export default {
  name: 'MomentsCard',
  data() {
    return {
      initScroll: false,
      activeTab: 'presonInfo',
      imgSH: 0,              // 初始化单张图片高度
      horzObj: {},           // 默认单张图片是水平默认80%显示 style默认为空
      moments: []            // 初始化动态
    }
  },
  created() {
    // 判断是否有当前活跃的friend，没有的话就获取自己的数据，展示个人页面，有的话就展示当前活跃朋友的页面
    if (this.activeId === 0) {
      this.moments = this.data.self.moments;
    } else {
      this.moments = this.friend.moments;
    }
  },
  mounted() {

    // 当图片的高度比宽度大时 要适当对图片进行比例缩放
    let imgObj = this.$refs.imgOnepic;

    imgObj.forEach((img) => {
      let imgH = img.height;
      let imgW = img.width;
      if(imgH/imgW >= 1.5){
        this.horzObj = {
          width: '60%',  // 如果图片高度大于宽度的1.5倍,按宽度的缩放比再乘以1.5
          height: imgW*0.6*1.5+'px',
          overflow: 'hidden'
        }
      }else if(imgH > imgW){
        this.horzObj = {
          width: ((1/(imgH/imgW)).toFixed(2)*100)+'%'  // 如果图片高度大于宽度，那么就按比例缩放
        }
      }else if(imgW/imgH >= 1.5){
        this.horzObj = {
          width: '100%'  // 如果图片宽度大于高度的1.5倍，那么就100%展示
        }
      }
    });

  },
  computed: {
    ...mapState(['activeId', 'data']),
    // ...mapGetters(['friend']),
  },
  methods: {
    ...mapMutations(['GET_ACTIVEID', 'SHOW_PERSONINFO', 'SHOW_DIALOG']), 
    // handleTabChange(val) {
    //   this.activeTab = val;
    //   // 判断是否初始化iscroll，否则就刷新
    //   this.$nextTick(() => {
    //     if(!this.tab2Scroll) {
    //       this.tab2Scroll = new IScroll(this.$refs.tab2Wrapper);
    //     }else{
    //       this.tab2Scroll.refresh();
    //     }
    //   })
    // }, 
    // _initScroll() {
    //   this.tab2Scroll = new IScroll(this.$refs.tab2Wrapper);
    // },
    // _showPersonInfo() {
    //   this.GET_ACTIVEID({ activeId: 0 });
    //   this.SHOW_PERSONINFO();
    // },
    // _showDialog() {
    //   // 判定打开的是不是自己的主页，如果是则屏蔽和自己的对话
    //   if (this.activeId !== 0) {
    //     this.SHOW_DIALOG();
    //     this.SHOW_PERSONINFO();
    //   }
    // }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
}
</script>
<style lang="scss" scoped>
  @import '../../common/scss/mixin';

  .moments-card{
    margin-top: 10px;
    &:last-child{
      margin-bottom: 10px;
    }
    .img-wrapper{
      width: 100%; 
      padding-left: 16px;
      padding-right: 16px;
    }
    .mu-card-media{
      position: static;
    }
    .img-one{
      position: relative;
      width: 80%;
    }
    .img-two{
      float: left;
      position: relative;
      width: 50%;
      margin-top: 2px;
      padding-right: 2px;
    }
    .img-three{
      float: left;
      position: relative;
      width: 33.3%;
      margin-top: 2px;
      padding-right: 2px;  
    }
    .img-wrapper_double,.img-wrapper_triplet{
      width: 100%;
      padding-top: 100%;           // 把高度撑开，形成一个正方形
      background-position: center;
      background-size: cover;
    }
    .mu-card-header,.mu-card-text{
      padding: 8px 16px;
    }
    .mu-card-text{
      text-align: justify;
    }
    .mu-card-actions{
      padding: 0 16px 8px;
      text-align: right;
    }
    .mu-flat-button{
      height: 26px;
      line-height: 26px;
      min-width: 26px;
      border-radius: 50%;
      margin-left: 5px;
    }
  }
    
</style>