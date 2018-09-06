<template>
<div class="associative-view-container">
  <template v-if='associativeWords && associativeWords.length'>
      <template v-for='word in associativeWords'>
        <div class='associative-view-word-line' @tap='tapHandle(word)' :key='word'>
          <span>{{word}}</span>
        </div>
      </template>
  </template>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'

export default {
  data () {
    return {
      associativeWords: []
    }
  },

  computed: {
    ...mapGetters([
      'searchInputVal'
    ])
  },

  watch: {
    searchInputVal (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getAssociativeWords().then((res) => {
          this.associativeWords = res
        })
      }
    }
  },

  methods: {
    tapHandle (word) {
      this.$store.commit('changeSearchWord', word)
      this.$store.commit('changeSearchStatus', 'resulting')
    },
    getAssociativeWords () {
      return this.dealSearchInputValChange()
    },
    dealSearchInputValChange () {
      return new Promise((resolve, reject) => {
        var result = [this.searchInputVal, '看到卡拉斯科', 'd凯迪拉克是快乐的', 'dlsaaaalll', '1alkalk', '1看到卡拉斯科', '1d凯迪拉克是快乐的', '1dlsaaaalll', '2alkalk', '2看到卡拉斯科', '2d凯迪拉克是快乐的', '2dlsaaaalll']
        resolve(result)
      })
    }
  },

  mounted () {
    this.getAssociativeWords().then((res) => {
      this.associativeWords = res
    })
  }
}
</script>

<style scoped lang='less'>
@containerPaddingTop: 142/3px;
@containerPaddingLr: 48/3px;
@wordLineH: 190/3px;
@wordLineSpanFs: 48/3px;

.associative-view-container {
    display: none;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: @containerPaddingTop;
    position: fixed;
    padding-left: @containerPaddingLr;
    padding-right: @containerPaddingLr;
    background-color: #ffffff;
    overflow-y: auto;
}
.associative-view-word-line {
    height: @wordLineH;
    line-height: @wordLineH;
    border-top: 1px solid #e5e5e5;
    span {
        color: #000000;
        font-size: @wordLineSpanFs;
    }
}
.associative-view-word-line:first-child {
    border-top-width: 0;
}
.associativing {
    display: flex;
}
</style>
