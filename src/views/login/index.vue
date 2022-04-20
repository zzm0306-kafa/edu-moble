<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
          {
            required: true,
            message: '请填写手机号'
          },
          {
            validator: phoneCheck,
            message: '输入非法手机号'
          }
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          {
            required: true,
            message: '请填写密码'
          },
          {
            validator: passwordCheck,
            message: '亲输入6-12位密码'
          }
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" :loading="isLoading" loading-text="登录加载中..."
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { getUserLogin } from '@/services/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      // 登录按钮加载中状态
      isLoading: false
    }
  },
  methods: {
    // 设置登录规则
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    },
    passwordCheck (value) {
      return /^[a-zA-Z0-9]{6,12}$/.test(value)
    },
    async onSubmit () {
      this.isLoading = true
      const { data } = await getUserLogin(this.form)
      if (data.state === 1) {
        this.$store.commit('setUser', data.content)
        this.$toast.success('登录成功')
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        this.$toast.fail('登录失败')
      }
      this.isLoading = false
    },
    // 返回按钮
    onClickLeft () {
      this.$toast('返回')
      this.$router.push({
        name: 'course'
      })
    }
  }
}
</script>
<style lang="scss">
</style>
