<template>
  <div class='wrapper'>
    <div class="header-container">
      <div @tap='backTapHandle' :class="['back-btn', {'back-btn-searching':(searchStatus!=='normal')}]">
        <!-- <img src="../../../static/images/search/lt.png" alt=""/> -->
      </div>

      <search-field></search-field>

      <div id='search-btn-field' :class="['search-btn-field', {'search-btn-field-searching':(searchStatus!=='normal')}]">
        <div id="shopping-car" class="shopping-car">
          <img src="../../../static/images/search/shopping-car.png" alt=""/>
        </div>
        <div id='user-info' class="user-info">
          <img src="../../../static/images/search/user-info.png" alt=""/>
        </div>
        <div @tap="searchBtnTapHandle" class="search-btn"><span>搜索</span></div>
      </div>
    </div>
    <search-tip v-if='isShowSearchTip'></search-tip>
    <associative-view v-if="searchStatus=='associativing'"></associative-view>
    <result-view v-if='isShowResult'></result-view>
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
      isShowSearchTip: false,
      isShowResult: false
    }
  },
  computed: {
    ...mapGetters([
      'searchStatus',
      'searchInputVal',
      'searchHasChosing',
      'searchInputPlaceholder'
    ])
  },
  components: {
    searchField,
    searchTip,
    associativeView,
    resultView
  },

  watch: {
    searchStatus (newVal) {
      if (newVal === 'searchtiping') {
        this.isShowSearchTip = true
      } else if (newVal === 'resulting') {
        this.isShowResult = true
      }
    }
  },

  methods: {
    backTapHandle () {
      // if (this.searchHasChosing && this.searchStatus === 'associativing') {
      //   this.$store.commit('changeSearchStatus', 'resulting')
      //   return
      // }
      // if (this.searchStatus === 'resulting') {
      //   this.$store.commit('changeSearchStatus', 'searchtiping')
      // } else {
      //   this.$store.commit('changeSearchStatus', 'normal')
      // }
    },
    searchBtnTapHandle () {
      var searchWord = this.searchInputVal || this.searchInputPlaceholder
      this.$store.commit('changeSearchWord', searchWord)
      this.$store.commit('changeSearchStatus', 'resulting')
    }
  },

  created () {
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
    width: @btnFieldSearchingPl;
    // width: @backBtnW;
    align-items: center;
    img{
      margin-left: @backBtnMl;
      width: @backBtnImgW;
      display: none;
    }
  }
  .back-btn-searching{
    // width: @backBtnSearchingW;
    width: @btnFieldSearchingPl;
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
