<template>
  <div class='wrapper'>
    <div class="header-container">
      <div id='back-btn' class="back-btn">
        <img src="../../../static/images/search/lt.png" alt=""/>
      </div>

      <search-field></search-field>

      <div id='search-btn-field' class="search-btn-field">
        <div id="shopping-car" class="shopping-car">
          <img src="../../../static/images/search/shopping-car.png" alt=""/>
        </div>
        <div id='user-info' class="user-info">
          <img src="../../../static/images/search/user-info.png" alt=""/>
        </div>
        <div id='search-btn' class="search-btn"><span>搜索</span></div>
      </div>
    </div>
    <search-tip></search-tip>
    <associative-view v-if="searchStatus=='associativing'"></associative-view>
    <result-view v-if="searchStatus=='resulting'"></result-view>
  </div>
</template>
<script>
import searchField from '@/components/search/searchField'
import searchTip from '@/components/search/searchTip'
import associativeView from '@/components/search/associativeView'
import resultView from '@/components/search/resultView'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      test: 1
    }
  },
  computed: {
    ...mapGetters([
      'searchStatus'
    ])
  },
  components: {
    searchField,
    searchTip,
    associativeView,
    resultView
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
    setTimeout(() => {
      this.test = 2
    }, 3000)
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped lang='less'>
  @imgBaseWH: 72/3px;
  @containerPtb: 27/3px;
  @containerH: @imgBaseWH;
  @backBtnW: 70/3px;
  @backBtnMl: 50/3px;
  @backBtnSearchingW: 122/3px;
  @shoppingCarW: 124/3px;
  @shoppingCarMr: 14/3px;
  @userInfoW: 88/3px;
  @userInfoMr: 65/3px;
  @btnFieldW: 290/3px;
  @btnFieldMl: 23/3px;
  @btnFieldSearchingW: 189/3px;
  @btnFieldSearchingPl: 32/3px;
  @searchBtnW: 125/3px;
  @searchBtnFontSize: 46/3px;
  @backBtnImgW: 30/3px;
  .wrapper{
    width: 100%;
  }
  .header-container {
    img{
      height: @imgBaseWH;
      align-items: center;
    }
    >*{
      height: @imgBaseWH;
    }
    position: fixed;
    z-index: 9999;
    display: flex;
    padding-top: @containerPtb;
    padding-bottom: @containerPtb;
    height: @containerH;
    flex-shrink: 0;
    width: 100%;
    background-color: #ffffff;
    border: 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .back-btn{
    display: flex;
    flex-shrink: 0;
    width: @backBtnW;
    align-items: center;
    img{
      margin-left: @backBtnMl;
      width: @backBtnImgW;
      display: none;
    }
  }
  .back-btn-searching{
    width: @backBtnSearchingW;
    img{
      display: flex;
    }
  }
  .search-btn-field{
    display: flex;
    box-sizing: border-box;
    width: @btnFieldW;
    padding-left: @btnFieldMl;
    flex-shrink: 0;
  }
  .search-normal-btn-field{
    animation-name: btnFieldToNormal;
    animation-duration: 200ms;
  }
  .search-btn-field-searching{
    animation-name: btnFieldToSearching;
    animation-duration: 200ms;
    width: @btnFieldSearchingW;
    padding-left: @btnFieldSearchingPl;
    padding-right: @btnFieldSearchingPl;

    .shopping-car{
      display: none;
    }
    .user-info{
      display: none;
    }
    .search-btn{
      display: flex;
    }
  }
  .shopping-car{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    width: @shoppingCarW;
    margin-right: @shoppingCarMr;
    flex-shrink: 0;
    padding-left: (@shoppingCarW - @imgBaseWH) / 2;
    padding-right: (@shoppingCarW - @imgBaseWH) / 2;
  }
  .user-info{
    display: flex;
    align-items: center;
    width: @userInfoW;
    flex-shrink: 0;
    margin-right: @userInfoMr;
    padding-left: (@userInfoW - @imgBaseWH) / 2;
    padding-right: (@userInfoW - @imgBaseWH) / 2;
  }
  .search-btn{
    display: none;
    height: @imgBaseWH;
    line-height: @imgBaseWH;
    width: @searchBtnW;
    flex-shrink: 0;
    span{
      width: 100%;
      text-align: center;
      font-size: @searchBtnFontSize;
      color: #07bcc2;
    }
  }
  .transformW(@name, @from, @to) {
    @keyframes @name{
      from {width: @from;}
      to {width: @to;}
    }
  }
  .transformW(btnFieldToSearching, @btnFieldW, @btnFieldSearchingW);
  .transformW(btnFieldToNormal, @btnFieldSearchingW, @btnFieldW);
</style>
