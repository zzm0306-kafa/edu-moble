<template>
  <div class="course-content-list">
    <van-pull-refresh v-model="RefreshLoading" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      @click="$router.push({
        name: 'course-info',
        params: {
          courseId: item.id
        }
      })">
      <div>
        <!-- 图片地址 -->
        <img :src="item.courseImgUrl || item.image">
      </div>
      <div class="course-info">
        <!-- 课程名称 -->
        <h3 v-text="item.courseName || item.name"></h3>
        <p class="course-preview" v-html="item.previewFirstField"></p>
        <p class="price-container" v-if="item.price">
          <span  class="course-discounts">￥{{ item.discounts }}</span>
          <s class="course-price">￥{{ item.price }}</s>
        </p>
      </div>
    </van-cell>
    </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  name: 'CourseContentList',
  props: {
    choiceData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      // 下拉刷新
      RefreshLoading: false,
      // 数据加载刷新
      loading: false,
      // 存储课程信息
      list: [],
      // 数据加载完毕
      finished: false,
      // 分页页数
      currentPage: 1
    }
  },
  methods: {
    // 下拉刷新
    async onRefresh () {
      this.currentPage = 1
      const { data } = await this.choiceData({
        currentPage: this.currentPage,
        pageSize: 20,
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list = data.content
      }
      this.RefreshLoading = false
      this.loading = false
      this.$toast('刷新成功')
    },
    // 课程信息加载
    async onLoad () {
      const { data } = await this.choiceData({
        currentPage: this.currentPage,
        pageSize: 20,
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      // 下一页
      this.currentPage++
      // 刷新结束
      this.loading = false
      // 课程加载完毕
      if (data.data && data.data.records.length < 20) {
        this.finished = true
      } else if (data.content && data.content.length < 20) {
        this.finished = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.course-content-list {
  position: fixed;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
// 课程条目设置flex，内部元素左右显示
.van-cell__value {
  height: 100px;
  padding: 10px 0;
  display: flex;
}

// 左侧图设置固定尺寸
.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}

// 右侧内容区域 flex: 1 撑满父元素
.course-info {
  flex: 1;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
}
.course-info .course-preview {
  flex-grow: 1;
}

.course-info .price-container {
  margin: 0;
}

.course-info .course-discounts {
  color: #ff7452;
  font-size: 14px;
  margin: 0;
  margin-right: 5px;
}
p, h3{
  margin: 0;
}
</style>
