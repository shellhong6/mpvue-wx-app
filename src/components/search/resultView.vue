<template>
  <div class="search-result-view-container">
    <template v-if='result.length'>
      <template v-for='item in result'>
        <div class='search-result-view-line'>
          <img class="result-icon" :src="item.cover" alt=""/>
          <div class="result-right-field">
            <span class='result-title'>{{item.title}}</span>
            <span class='result-owner'>{{item.owner}}</span>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },

  components: {
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped lang='less'>
  @containerPaddingTop: 142/3px;
  @containerPaddingLr: 48/3px;
  @lineHeight: 328/3px;
  @lineImgHeight: 238/3px;
  @lineImgWidth: 166/3px;
  @lineImgMarginR: 51/3px;
  @resultTitleFs: 48/3px;
  @resultTitleMarginB: 22/3px;
  @resultOwnerFs: 32/3px;

  .search-result-view-container{
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    padding-top: @containerPaddingTop;
    position: fixed;
    padding-left: @containerPaddingLr;
    padding-right: @containerPaddingLr;
    background-color: #ffffff;
  }
  .search-result-view-line{
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 0;
    height: @lineHeight;
    align-items: center;
    img{
      height: @lineImgHeight;
      width: @lineImgWidth;
      margin-right: @lineImgMarginR;
      flex-shrink: 0;
    }
  }
  .search-result-view-line:first-child{
  .result-right-field{
    border-top-width: 0px;
  }
  }
  .result-right-field{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-top: 1px solid #e5e5e5;
    flex-grow: 1;
    flex-shrink: 1;
    height: 100%;
  }
  .result-title{
    color: #000000;
    font-size: @resultTitleFs;
    margin-bottom: @resultTitleMarginB;
    lines: 1;
    text-overflow: ellipsis;
    width: 100%;
  }
  .result-owner{
    color: #cfcfcf;
    font-size: @resultOwnerFs;
  }
  .resulting{
    display: flex;
  }
</style>
