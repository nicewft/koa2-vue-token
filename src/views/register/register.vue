<template>
  <div class="register-container">
    <el-form>
      <el-form-item label="帐号">
        <el-input v-model="inputParams.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="inputParams.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <el-button @click="toLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from '@/utils/fetch'
import {mapActions} from 'vuex'

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
    ...mapActions(['toRegister']),
    register() {
      this.toRegister(this.inputParams).then(() => {
        setTimeout(() => {
          this.$router.push('/')
        }, 200)
      })
    },
    toLogin() {
      this.$router.push('/login')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
