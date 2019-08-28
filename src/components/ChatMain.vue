<template>
  <div class="chat-main">
    <div class="header">
      {{ activeContact.name }}
    </div>
    <div
      v-if="loadingMessages"
      class="loading-messages"
    >
      <spinner/>
      <span class="loading-title">
        Loading Messages...
      </span>
    </div>
    <div
      v-else-if="messages.length === 0"
      class="empty-state"
    >
      <img
        class="empty-state-image"
        src="../assets/empty-state.svg"
      >
      <h2 class="empty-state-title">
        No new message?
      </h2>
      <span class="empty-state-description">
        Send your first message below.
      </span>
    </div>
    <chat-messages
      v-else
      ref="messagesContainer"
      :messages="messages"
    />
    <form
      class="chat-input-form"
      @submit.prevent="sendMessage"
    >
      <input
        class="chat-input"
        v-model="messageText"
        type="text"
        placeholder="Type something"
        required="required"
        :disabled="sendingMessage"
      >
      <spinner
        v-if="sendingMessage"
        class="sending-message-spinner"
        :size="20"
      />
    </form>
  </div>
</template>

<script>
import { CometChat } from '@cometchat-pro/chat'
import ChatMessages from '@/components/ChatMessages'
import Spinner from '@/components/Spinner'

export default {
  components: {
    ChatMessages,
    Spinner
  },

  props: {
    activeContact: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      loadingMessages: false,
      messages: [],
      messageText: '',
      sendingMessage: false
    }
  },

  mounted () {
    const listenerID = 'UNIQUE_LISTENER_ID'
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: message => {
          if (message.sender.uid === this.activeContact.uid) {
            this.messages.push(message)
          }
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        }
      })
    )
  },

  watch: {
    'activeContact.uid': {
      immediate: true,
      handler () {
        this.loadMessages()
      }
    }
  },

  methods: {
    loadMessages () {
      this.loadingMessages = true
      const messagesRequest = new CometChat.MessagesRequestBuilder()
        .setUID(this.activeContact.uid)
        .build()
      messagesRequest.fetchPrevious()
        .then(messages => {
          this.messages = messages
          this.loadingMessages = false
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        })
        .catch(error => {
          console.log('error', error)
          this.loadingMessages = false
        })
    },

    sendMessage () {
      this.sendingMessage = true
      const textMessage = new CometChat.TextMessage(
        this.activeContact.uid,
        this.messageText,
        CometChat.MESSAGE_TYPE.TEXT,
        CometChat.RECEIVER_TYPE.USER
      )

      CometChat.sendMessage(textMessage)
        .then(message => {
          this.sendingMessage = false
          this.messageText = ''
          this.messages.push(message)
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        })
        .catch(error => {
          console.log(error)
          this.sendingMessage = false
        })
    },

    scrollToBottom () {
      const messagesContainer = this.$refs.messagesContainer
      if (messagesContainer) {
        messagesContainer.$el.scrollTo(0, messagesContainer.$el.scrollHeight + 30)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.chat-main
  border-left: 1px solid #BDCCD7
  background: #F8F9FB
  border-radius: 0 6px 6px 0
  display: flex
  justify-content: space-between
  flex-direction: column
  max-height: 100%

.header
  background: #FFFFFE
  font-family: 'Roboto', sans-serif
  font-weight: normal
  font-size: 15px
  line-height: 18px
  color: #2D313F
  padding: 20px 25px
  border-bottom: 1px solid #BDCCD7
  border-radius: 0 6px 0 0

.empty-state
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  margin-top: 50px

.empty-state-title
  font-family: 'Abril Fatface', cursive
  font-weight: normal
  font-size: 26px
  line-height: 35px
  text-align: center
  color: #1B47DB
  margin: 15px 0

.empty-state-description
  font-family: 'Roboto', sans-serif
  font-weight: normal
  font-size: 16px
  line-height: 22px
  text-align: center
  color: #2D313F
  mix-blend-mode: normal
  opacity: 0.8

.chat-input-form
  background: #FFFFFF
  display: flex
  box-shadow: 0px -1px 0px rgba(189, 204, 215, 0.544362)

.sending-message-spinner
  padding: 15px

.chat-input
  width: 100%
  background: #FFFFFF
  border: none
  outline: none
  resize: none
  border-radius: 0 0 6px 0
  font-family: 'Roboto', sans-serif
  font-weight: normal
  font-size: 16px
  color: #333
  padding: 20px

.chat-input::placeholder
  color: #BBBEBE

.loading-messages
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

.loading-title
  font-family: 'Roboto', sans-serif
  margin-top: 20px
  font-size: 20px
</style>
