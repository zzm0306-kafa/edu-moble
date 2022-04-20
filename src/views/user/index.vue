<template>
    <div class="user">
      <!-- 顶部功能 -->
      <van-cell-group>
        <!-- 用户信息 -->
        <van-cell class="user-info" :border="false">
          <van-image
            width="50"
            height="50"
            round
            :src="userList.portrait || 'https://s0.lgstatic.com/common/image/pc/default_boy_headpic1.png'"
          />
          <div class="user-info-content">
            <h3>{{ userList.userName }}</h3>
            <span>
              <van-icon name="edit"/>编辑个人信息
            </span>
          </div>
        </van-cell>
        <!-- 账户信息 -->
        <van-cell class="account-info">
          <van-grid :border="false">
            <van-grid-item>
              <span class="grid-item-value">18.88</span>
              <span>学习时⻓</span>
            </van-grid-item>
            <van-grid-item>
              <span class="grid-item-value">1888</span>
              <span>钱包/勾⾖</span>
            </van-grid-item>
            <van-grid-item>
              <span class="grid-item-value">88</span>
              <span>优惠券</span>
            </van-grid-item>
            <van-grid-item>
              <span class="grid-item-value">18888</span>
              <span>学分</span>
            </van-grid-item>
          </van-grid>
        </van-cell>
        <!-- 底部菜单栏 -->
        <van-cell class="bottom-info">
          <van-cell icon="user-o" title="分销中心" is-link value="收益200元"></van-cell>
          <van-cell icon="setting-o" title="个性化设置" is-link></van-cell>
          <van-cell icon="down" title="我的下载" is-link></van-cell>
          <van-cell icon="question-o" title="帮助与反馈" is-link></van-cell>
          <van-cell icon="info-o" title="关于拉勾教育" is-link value="v2.0.0"></van-cell>
          <van-cell icon="setting-o" title="登录" is-link to="/login" ></van-cell>
          </van-cell>
      </van-cell-group>
      <!-- 底部功能 -->
      <layout-footer></layout-footer>
    </div>
</template>
<script>
import LayoutFooter from '@/components/LayoutFooter'
import { getInfo } from '@/services/user'
export default {
  name: 'UserIndex',
  components: { LayoutFooter },
  data () {
    return {
      userList: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const { data } = await getInfo()
      if (data.state === 1) {
        this.userList = data.content
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// 用户信息
.user-info {
  padding: 30px 20px 0px;
  background-color: rgb(248, 150, 3);
}
// 让头像与右侧信息区域在⼀⾏显示
.user-info .van-cell__value {
  display: flex;
}
.user-info .user-info-content {
  padding-left: 15px;
}
.user-info .user-info-content h3 {
  font-size: 18px;
  margin: 5px;
}
// 账户信息
.account-info {
  background-color: rgb(248, 150, 3);
  margin-top: -1px;
}
.account-info .van-cell__value {
  border-radius: 15px;
}
.account-info .grid-item-value {
  font-size: 22px;
  font-weight: 700;
}
.bottom-info {
  margin-top: 10px;
}
</style>
