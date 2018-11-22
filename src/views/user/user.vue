<template>
  <div class="user-conatiner">
    <div class="user-info">
      <div>用户列表</div>
      <div>
        <span>欢迎你，{{userName}}</span>
        <span @click="logout">退出登录</span>
      </div>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{item.userName}}</li>
    </ul>
  </div>
</template>

<script>
import axios from '@/utils/fetch'
export default {
  data() {
    return {
      list: [],
      userName: ''
    }
  },
  methods: {
    async _getAllUser() {
      try {
        let data = await axios.post('/getAllUser')
        this.list = data.data.list
        this.userName = data.data.userName
      } catch (error) {
        console.log(error)
      }
    },
    logout() {
      this.$store.dispatch('toLogout')
    }
  },
  mounted() {
    this._getAllUser()
  }
}
</script>
<style lang="scss" scoped>
.user-info{
  display: flex;
  justify-content: space-between;
}
</style>
