<template>
  <div class="login-page">
    <div class="login-container">
      <div class="main">
        <h1 class="title">
          Welcome Back
        </h1>
        <p class="description">
          To access this demo, you can use one of the following five users: <strong>superhero1</strong>, <strong>superhero2</strong>, <strong>superhero3</strong>, <strong>superhero4</strong>, or <strong>superhero5</strong>.
        </p>
        <form
          class="login-form"
          @submit.prevent="login"
        >
          <div class="username-field">
            <label class="label">
              Username
            </label>
            <div class="input-group">
              <input
                class="username-input"
                v-model="username"
                :disabled="loggingIn"
                type="text"
                required="required"
              >
              <svg
                style="width:24px;height:24px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#BDCCD7"
                  d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                />
              </svg>
            </div>
            <button
              class="login-button"
              :disabled="loggingIn"
            >
              <template v-if="!loggingIn">
                LOG IN
              </template>
              <template v-else>
                LOGGING IN...
              </template>
            </button>
          </div>
        </form>
      </div>
      <img
        class="illustration"
        src="../assets/login-illustration.svg"
      >
    </div>
  </div>
</template>

<script>
import { CometChat } from '@cometchat-pro/chat'

export default {
  data () {
    return {
      username: '',
      loggingIn: false
    }
  },

  methods: {
    login () {
      const apiKey = process.env.VUE_APP_COMETCHAT_API_KEY
      this.loggingIn = true
      CometChat.login(this.username, apiKey)
        .then(() => {
          this.loggingIn = false
          this.$router.push({ name: 'chat' })
        })
        .catch(error => {
          this.loggingIn = false
          console.log('error', error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-page
  background: url('../assets/login-background.svg')
  background-repeat: no-repeat
  background-size: cover
  background-position: center center
  height: 100%
  display: flex
  justify-content: center
  align-items: center

.login-container
  background: #FFFFFE
  max-width: 700px
  width: calc(100% - 20px)
  padding: 60px 50px
  border-radius: 6px
  box-shadow: 0px 2px 38px rgba(45, 49, 63, 0.397236)
  display: flex
  justify-content: space-between

.main
  flex: 1
  text-align: left
  padding-right: 30px

.title
  font-family: 'Abril Fatface', cursive
  font-weight: normal
  color: #2D313F
  font-size: 26px
  line-height: 35px

.description
  font-family: 'Roboto', sans-serif
  color: #444
  line-height: 1.4

.description strong
  font-weight: 500

.login-button
  font-family: 'Roboto', sans-serif
  font-weight: bold
  font-size: 13px
  line-height: 15px
  display: flex
  align-items: center
  text-align: center
  justify-content: center
  text-transform: uppercase
  color: #FFFFFF
  background: #1B47DB
  box-shadow: 0px 5px 13px rgba(27, 71, 219, 0.303349)
  border-radius: 4.09091px
  border: none
  width: 100%
  padding: 12px
  margin-top: 50px
  outline: none
  cursor: pointer

.login-button:hover
  background: lighten(#1B47DB, 5%)

.login-button:disabled
  background: lighten(#1B47DB, 20%)
  cursor: default

.label
  font-family: 'Roboto', sans-serif
  font-weight: bold
  font-size: 13.0909px
  line-height: 15px
  color: #BDCCD7

.username-input
  font-family: 'Roboto', sans-serif
  font-weight: normal
  font-size: 13px
  line-height: 15px
  color: #2D313F
  mix-blend-mode: normal
  opacity: 0.8
  border: none
  flex: 1
  outline: none

.username-input:disabled
  color: #888

.input-group
  border-bottom: 1px solid #BDCCD7
  display: flex
  justify-content: space-between
  align-items: center
  padding: 3px 0

@media (max-width: 605px)
  .illustration
    display: none
  .main
    padding: 0
</style>
