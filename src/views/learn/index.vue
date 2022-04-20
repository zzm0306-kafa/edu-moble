<template>
  <div class="learn">
    <!-- 标题区-->
    <van-nav-bar
      title="已购课程"
    />
    <!-- 内容区-->
    <course-content-list
      :choice-data="choiceData"
    ></course-content-list>
    <!-- 底部按钮导航 -->
    <layout-footer></layout-footer>
  </div>
</template>
<script>
import LayoutFooter from '@/components/LayoutFooter'
import CourseContentList from '@/components/CourseContentList'
import { getPurchaseCourse } from '@/services/course'
export default {
  name: 'LearnIndex',
  components: { LayoutFooter, CourseContentList },
  methods: {
    choiceData () {
      return getPurchaseCourse()
    }
  }
}
</script>
<style lang="scss" scoped>
.course-content-list {
  top: 50px;
  bottom: 50px;
}
</style>
