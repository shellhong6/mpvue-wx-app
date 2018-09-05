<template>
  <div class="searchTip-view-container" :style="{display:searchTipStatus}">
    <template v-if='hotWord && hotWord.length'>
      <div class="hot-container">
        <div class='searchTip-view-header'>热门搜索</div>
        <div class="searchTip-view-hot-words">
          <template v-for='(word, index) in hotWord'>
            <span @tap='hotWordTapHandle(word)'>{{word}}</span>
          </template>
        </div>
      </div>
    </template>
    <template v-if='historyWord && historyWord.length'>
      <div class='searchTip-view-block' type='history'>
        <div class='searchTip-view-header'>搜索历史</div>
        <div class="searchTip-view-history-words">
          <template v-for='(word, index) in historyWord'>
            <div @tap='historyWordTapHandle(word)' class="searchTip-view-history-line">
              <div class="history-icon"></div>
              <span :data-text='word'>{{word}}</span>
              <div @tap.stop='removeTapHandle(index)' class="history-remove-icon"></div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import {requestUrl} from '@/utils/emun'
import {request} from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      historyWord: ['小说', '军事', '倾国倾城', '学校', '玄幻修仙', '名人名言'],
      hotWord: []
    }
  },

  computed: {
    ...mapGetters([
      'searchStatus'
    ]),
    searchTipStatus () {
      if (this.searchStatus === 'searchtiping') {
        this.getMockSearchTipData().then((hotWord) => {
          this.hotWord = hotWord
        })
        return 'block'
      } else {
        return 'none'
      }
    }
  },

  components: {},

  watch: {
  },

  methods: {
    hotWordTapHandle (word) {
      this.$store.commit('changeSearchWord', word)
      this.$store.commit('changeSearchStatus', 'resulting')
    },
    historyWordTapHandle (word) {
      this.$store.commit('changeSearchWord', word)
      this.$store.commit('changeSearchStatus', 'resulting')
    },
    removeTapHandle (index) {
      this.historyWord.splice(index, 1)
    },
    getSearchTipData: (function () {
      var result = null
      return function () {
        return new Promise((resolve, reject) => {
          if (result) {
            resolve(result)
            return
          }
          request({
            url: requestUrl.hotWordUrl
          })
            .then((res) => {
              result = {
                historyWord: this.historyWord,
                hotWord: res.words
              }
              resolve(result)
            }, () => {
              console.error('request error!')
            })
        })
      }
    })(),
    getMockSearchTipData () {
      return new Promise((resolve, reject) => {
        resolve(['斗破苍穹', '九星霸体诀', '匹夫的逆袭', '大主宰', '闪婚老公太抢手', '上位', '傲世丹神', '时光和你都很美', '第一婚宠：腹黑老公别闹了', '天涯明月刀', '雍正皇帝', '锦凰'])
      })
    }
  },

  mounted () {
  }
}
</script>

<style scoped lang='less'>
  @containerPaddingTop: 142/3px;
  @searchTipBlockPaddingLR: 47/3px;
  @searchTipHeaderH: 46/3px;
  @searchTipHeaderFs: 44/3px;
  @searchTipHeaderMl: 24/3px;
  @searchTipHeaderMt: 39/3px;
  @searchTipHotMt: 27/3px;
  @searchTipHotTextPaddingTb: 13/3px;
  @searchTipHotTextPaddingLr: 30/3px;
  @searchTipHotTextMarginB: 42/3px;
  @searchTipHotTextMarginR: 30/3px;
  @searchTipHotTextFs: 40/3px;
  @searchTipHistoryWordsMt: 27/3px;
  @searchTipHistoryLineH: 146/3px;
  @searchTipHistoryLinePaddingLr: 24/3px;
  @searchTipHistoryLineTextFs: 40/3px;
  @historyIconWh: 47/3px;
  @historyIconMr: 18/3px;
  @historyRemoveIconWh: 41/3px;


  .searchTip-view-container{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding-top: @containerPaddingTop;
  position: fixed;
  background-color: #ffffff;
  overflow-y: auto;
  }
  .searchTiping{
  display: flex;
  }
  list{
  background-color: #ffffff;
  height: 100%;
  }
  .searchTip-view-block{
  flex-direction: column;
  flex-shrink: 0;
  padding-left: @searchTipBlockPaddingLR;
  padding-right: @searchTipBlockPaddingLR;
  }
  .searchTip-view-header{
  height: @searchTipHeaderH;
  font-size: @searchTipHeaderFs;
  color: #989898;
  margin-left: @searchTipHeaderMl;
  margin-top: @searchTipHeaderMt;
  }
  .hot-container{
  padding-left: @searchTipBlockPaddingLR;
  padding-right: @searchTipBlockPaddingLR;
  }
  .searchTip-view-hot-words{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: @searchTipHotMt;
  span{
    padding: @searchTipHotTextPaddingTb @searchTipHotTextPaddingLr;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    font-size: @searchTipHotTextFs;
    color: #646464;
    flex-shrink: 0;
    margin-bottom: @searchTipHotTextMarginB;
    margin-right: @searchTipHotTextMarginR;
  }
  }
  .searchTip-view-history-words{
  flex-direction: column;
  margin-top: @searchTipHistoryWordsMt;
  }
  .searchTip-view-history-line{
  display: flex;
  align-items: center;
  border: 0;
  border-top: 1px solid #e5e5e5;
  flex-shrink: 0;
  height: @searchTipHistoryLineH;
  padding-left: @searchTipHistoryLinePaddingLr;
  padding-right: @searchTipHistoryLinePaddingLr;
  span{
    color: black;
    font-size: @searchTipHistoryLineTextFs;
    flex-grow: 1;
  }

  }
  .history-icon{
  width: @historyIconWh;
  height: @historyIconWh;
  margin-right: @historyIconMr;
  background: url(../../../static/images/search/history.png) no-repeat;
  background-size: contain;
  }
  .history-remove-icon{
  width: @historyRemoveIconWh;
  height: @historyRemoveIconWh;
  background: url(../../../static/images/search/history-remove.png) no-repeat;
  background-size: contain;
  }
</style>
