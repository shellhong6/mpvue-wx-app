<template>
  <div class="search-field-container">
    <button style="opacity:0;position:fixed;top:-100px;left:-100px;width:0;height:0;"></button>
    <div class="input-field-bg">
      <img mode="widthFix" class="search-icon" src="../../../static/images/search/search.png" alt="">
      <input @focus='focusHandle' @input='inputHandle' type="text" v-model="inputVal" :placeholder="searchInputPlaceholder"></input>
      <img mode="widthFix" @tap='tapClearHandle' :class="['search-clear', {'search-clear-searching':isShowClearBtn}]" src="../../../static/images/search/clear.png" alt="">
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      inputVal: '' // 为了解决v-model闪烁问题，不能使用getters中的searchInputVal，而且尽量把两者分开处理，减少searchInputVal对inputVal的影响
    }
  },

  watch: {
    searchInputVal (newVal, oldVal) {
      console.log('newVal, oldVal--', newVal, oldVal)
      if (newVal !== oldVal) {
        this.inputVal = newVal
      }
    }
  },

  computed: {
    ...mapGetters([
      'searchHasChosing',
      'searchStatus',
      'searchInputVal',
      'searchInputPlaceholder'
    ]),
    isShowClearBtn () {
      if (this.inputVal === '') {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    focusHandle () {
      if (this.searchInputVal !== '') {
        this.$store.commit('changeSearchStatus', 'associativing')
        return
      }
      if (this.searchStatus === 'normal') {
        this.$store.commit('changeSearchStatus', 'searchtiping')
      }
    },
    inputHandle (event) {
      var val
      if (event.target) {
        val = event.target.value
      } else {
        val = event
      }
      setTimeout(() => {
        this.$store.commit('changeSearchInputVal', val)
      }, 0)
      if (this.searchHasChosing) {
        if (val === '') {
          this.$store.commit('changeSearchStatus', 'resulting')
        } else {
          this.$store.commit('changeSearchStatus', 'associativing')
        }
      } else {
        if (val === '') {
          this.$store.commit('changeSearchStatus', 'searchtiping')
        } else {
          this.$store.commit('changeSearchStatus', 'associativing')
        }
      }
    },
    tapClearHandle () {
      this.inputVal = ''
      this.$store.commit('changeSearchInputVal', '')
      setTimeout(() => {
        this.inputHandle('')
      }, 10)
    }
  },

  created () {
  }
}
</script>

<style scoped lang='less'>
  @baseSize: 55/3px;
  @searchIconW: @baseSize;
  @searchIconH: @baseSize;
  @searchIconMl: 23/3px;
  @searchIconMr: 12/3px;
  @inputH: @baseSize;
  @inputFontSize: 40/3px;
  @searchClearWH: 70/3px;
  @searchClearMr: 14/3px;
  @searchClearMl: 4/3px;
  .search-field-container {
    display: flex;
    flex: 1;
    flex-direction: row;
  }
  .input-field-bg{
    display: flex;
    background-color: #f2f2f2;
    border: 1px solid #f2f2f2;
    border-radius: 100px;
    height: 100%;
    width: 100%;
    align-items: center;
    input{
      background-color: #f2f2f2;
      outline: 0;
      border: 0;
      flex-shrink: 1;
      flex-grow: 1;
      font-size: @inputFontSize;
      height: @inputH;
      line-height: @inputH;
      color: #606060;
      font-weight: bold;
    }
  }
  .input-field-bg .search-icon{
    width: @searchIconW + 6;
    height: @searchIconH;
    margin-left: @searchIconMl;
    margin-right: @searchIconMr;
  }
  .search-clear{
    width: @searchClearWH + 6;
    height: @searchClearWH;
    margin-left: @searchClearMl;
    margin-right: @searchClearMr;
    opacity: 0;
  }
  .search-clear-searching{
    opacity: 1;
  }
</style>
