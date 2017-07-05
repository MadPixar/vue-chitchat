<template>
  <div class="moments-card">
    <mu-card>
      <mu-card-header title="Myron Avatar" subTitle="sub title">
        <mu-avatar src="/static/images/avatar.jpg" slot="avatar"/>
      </mu-card-header>
      <div class="img-wrapper">
        <!-- <div class="img-one" v-if="">
          
        </div> -->
        <div class="img-one" :style="horzObj">
          <mu-card-media title="Image Title" subTitle="Image Sub Title">
            <img src="/static/images/m21.jpg" ref="imgOnepic" />
          </mu-card-media>
        </div>
        

      </div>
      <!-- <mu-card-title title="Content Title" subTitle="Content Title"/> -->
      <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
      <mu-card-actions >
        <mu-flat-button icon="thumb_up" color="#999" :iconClass="`icon-small`"/>
        <mu-flat-button icon="chat" color="#999" :iconClass="`icon-small`"/>
      </mu-card-actions>
    </mu-card>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
const ERROR_OK = 0;

export default {
  name: 'MomentsCard',
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
        // this.$nextTick(() => {
        //   this._initScroll();
        // })
    // 挡图片的高度比宽度大时 要适当对图片进行比例缩放
    let imgH = this.$refs.imgOnepic.height;
    let imgW = this.$refs.imgOnepic.width;
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
    // console.log(this.$refs.imgOnepic.height);
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
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/mixin';

    .moments-card{
      margin-top: 10px;
      .img-wrapper{
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