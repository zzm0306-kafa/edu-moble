<template>
  <div class="course-info">
    <van-nav-bar
     title="课程详情"
     left-text="返回"
     left-arrow
     @click-left="onClickLeft"
    />
    <!-- 如果已购买，除去底部购买区域 -->
    <van-cell-group :style="styleOptions">
      <!-- 课程图片 -->
      <van-cell class="course-img">
        <van-image :src="course.courseImgUrl"/>
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-desctription">
        <!-- 课程名称 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程概述 -->
        <p v-text="course.previewFirstField"></p>
        <!-- 课程销售信息 -->
        <div class="course-saleInfo">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <span style="text-decoration: line-through red">￥{{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}⼈已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <!-- 课程详情 -->
      <van-cell class="course-detail">
        <!-- 选项卡 -->
        <van-tabs sticky>
          <van-tab title="详情">
            <!-- 详情在后台是通过富⽂本编辑器设置的，内容为 HTML ⽂本-->
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section-and-lesson
              v-for="item in sections"
              :key="item.id"
              :section-data="item"
            >
            </course-section-and-lesson>
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部购买区域 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
      </div>
      <van-button type="primary" @click="courseBuy">⽴即购买</van-button>
    </van-tabbar>
  </div>
</template>
<script>
import { getCourseById, getSectionAndLesson } from '@/services/course'
import CourseSectionAndLesson from './components/CourseSectionAndLesson'
export default {
  name: 'CourseInfo',
  components: {
    CourseSectionAndLesson
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      // 课程详情信息
      course: {},
      // 课程章节信息
      sections: {},
      // 设置购买样式信息
      styleOptions: {}
    }
  },
  created () {
    // 获取课程详情信息
    this.getCourseInfo()
    // 获取课程目录信息
    this.getSection()
  },
  methods: {
    // 购买课程
    courseBuy () {
      if (this.$store.state.user) {
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        this.$router.push({
          name: 'login',
          params: {
            redirect: this.$route.fullPath
          }
        })
      }
    },
    // 获取课程详情信息
    async getSection () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      this.sections = data.content.courseSectionList
      if (data.content.isBuy) {
        this.styleOptions.bottom = 0
      }
    },
    // 返回首页
    onClickLeft () {
      this.$router.push({
        name: 'course'
      })
    },
    // 获取课程详情信息
    async getCourseInfo () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
    }
  }
}
</script>
<style lang="scss" scoped>
.van-cell {
  padding: 0;
}
.course-img {
  height: 280px;
}

.course-desctription {
  padding: 10px 20px;
  height: 150px;
}

.course-desctription h2 {
  padding: 0;
}

.course-saleInfo {
  display: flex;
}

.course-price {
  flex: 1;
  margin: 0;
}
// 修改 discounts 作用范围，让顶部与底部均可使用
.discounts {
  color: #ff7452;
  font-size: 24px;
  font-weight: 700;
}

.course-saleInfo .tag{
  line-height: 15px;
  background: #f8f9fa;
  border-radius: 2px;
  padding: 7px 8px;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  margin-left: 10px;
}
// 添加底部导航后设置
.van-cell-group {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}
// 设置内部文字内容
.van-tabbar {
  line-height: 50px;
  padding: 0 20px;
  // 设置盒子模型
  box-sizing: border-box;
  display: flex;
  //  内部元素左右显示
  justify-content: space-between;
  // 内容居中
  align-items: center;
}
span {
  font-size: 14px;
}
.van-button {
  width: 50%;
  height: 80%;
}
</style>
