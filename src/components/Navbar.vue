<template>
  <div class="navbar">
    <div class="left">
      <img
        class="logo"
        src="../assets/logo.svg"
      >
      <span class="title">
        Chat
      </span>
    </div>
    <div class="right">
      <span class="welcome-message">
        Welcome <strong class="user-name">{{ $currentUser.name }}</strong>
      </span>
      <spinner
        v-if="loggingOut"
        :size="20"
      />
      <img
        v-else
        class="avatar"
        :src="$currentUser.avatar"
        @click="logout"
      >
    </div>
  </div>
</template>

<script>
import { CometChat } from '@cometchat-pro/chat'
import Spinner from '@/components/Spinner'

export default {
  components: { Spinner },
  data () {
    return {
      loggingOut: false
    }
  },

  methods: {
    logout () {
      this.loggingOut = true
      CometChat.logout()
        .then(() => {
          this.loggingOut = false
          this.$router.push({ name: 'login' })
        })
        .catch(error => {
          this.loggingOut = false
          console.log('error', error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.navbar
  height: 50px
  width: 100%
  background: #FFFFFE
  padding: 0 20px
  display: flex
  justify-content: space-between
  align-items: center
  font-family: 'Roboto', sans-serif

.left, .right
  display: flex
  justify-content: center
  align-items: center

.logo
  margin-right: 10px

.title
  color: #2D313F
  font-family: 'Abril Fatface', cursive
  font-weight: normal
  font-size: 22px
  line-height: 30px

.welcome-message
  margin-right: 10px

.user-name
  font-weight: 500

.avatar
  width: 30px
  height: 30px
  border-radius: 50%
  overflow: hidden
  cursor: pointer
</style>
