<template>
  <div class="course-content">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in adsStatusList" :key="item.id">
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>
    <course-content-list
      :choice-data="choiceData"
    ></course-content-list>
  </div>
</template>
<script>
import { getAllAds, getQueryCourses } from '@/services/course'
import CourseContentList from '@/components/CourseContentList'
export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
  data () {
    return {
      // 存储轮播图
      adsList: []
    }
  },
  created () {
    // 加载顶部轮播图
    this.getAds()
  },
  methods: {
    choiceData (options) {
      return getQueryCourses(options)
    },
    async getAds () {
      const { data } = await getAllAds({
        spaceKeys: 999
      })
      this.adsList = data.content[0].adDTOList
    }
  },
  // 创建计算属性来显示上架轮播图
  computed: {
    adsStatusList () {
      return this.adsList.filter(item => item.status === 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.my-swipe {
  width: 100%;
}
.my-swipe .van-swipe-item {
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.my-swipe img {
  width: 100%;
  height: 170px;
  margin: 0 auto;
}
.course-content-list {
  top: 220px;
  bottom: 50px;
}
</style>
