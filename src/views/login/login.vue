<template>
  <div class="login-container">
    <el-form>
      <el-form-item label="帐号">
        <el-input v-model="inputParams.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="inputParams.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="toRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from '@/utils/fetch'
export default {
  data() {
    return {
      inputParams: {
        userName: 'laowang',
        password: '123456'
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch('toLogin', this.inputParams).then(() => {
        setTimeout(() => {
          this.$router.push('/')
        },200)
      })
    },
    toRegister() {
      this.$router.push('/register')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
