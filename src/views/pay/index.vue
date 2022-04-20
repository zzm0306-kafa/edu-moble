<template>
  <div class="course-pay">
    <van-cell-group>
      <van-cell class="course-info">
        <img :src="course.courseImgUrl" alt="">
        <div class="price-info">
          <div class="course-name" v-text="course.courseName"></div>
          <div class="discounts">￥{{ course.discounts }}</div>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <div>购买信息</div>
        <div>购买课程后使⽤此账号登录【拉勾教育】学习课程</div>
        <div class="username">当前账号：{{ username }}</div>
      </van-cell>
      <van-cell class="pay-channel">
        <div class="title">⽀付⽅式</div>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { getCourseById } from '@/services/course'
export default {
  name: 'CoursePay',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      course: {}
    }
  },
  created () {
    this.loadCourse()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      console.log(data)
    }
  },
  // 对用户账号进行遮蔽
  computed: {
    username () {
      return this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }
}
</script>
<style lang="scss">
.course-pay {
  position: absolute;
  width: 100%;
  height: 100%;
}
// 容器
.van-cell-group {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}
// 课程信息
.course-info {
  height: 170px;
  padding: 40px 20px 0;
  margin-bottom: 10px;
  box-sizing: border-box;
}
// 让图⽚与右侧信息同⾏显示
.course-info .van-cell__value {
  display: flex;
}
// 课程图片
.course-info img {
  width: 80px;
  height: 107px;
  border-radius: 10px;
}
.price-info {
  height: 107px;
  padding: 5px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price-info .course-name {
  font-size: 16px;
}
.price-info .discounts {
  font-size: 22px;
  font-weight: 700;
  color: #ff7452;
}
// 账户信息
.account-info {
  height: 120px;
  margin-bottom: 10px;
}
.account-info div:nth-child(2) {
  font-size: 12px;
  color: #999;
}
.account-info .username {
  margin: 20px 0 10px;
  font-size: 16px;
}
</style>
