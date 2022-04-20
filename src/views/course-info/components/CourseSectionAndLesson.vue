<template>
  <div class="section-and-lesson">
    <!-- 章节-->
    <h2 class="section">{{ sectionData.sectionName }}</h2>
    <!-- 课时 -->
    <p
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      class="lesson"
      @click="handleLesson(item)"
    >
    <!-- 课时标题 -->
    <span v-text="item.theme"></span>
    <!-- 课时有图标 -->
    <van-icon v-if="item.canPlay" name="play-circle" size="20"></van-icon>
    <van-icon v-else name="lock" size="20"></van-icon>
    </p>
  </div>
</template>
<script>
export default {
  name: 'CourseSectionAndLesson',
  props: {
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleLesson (lessonInfo) {
      if (lessonInfo.canPlay) {
        this.$router.push({
          name: 'course-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.section-and-lesson {
  padding: 0 20px;
}
.lesson {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
}
</style>>
