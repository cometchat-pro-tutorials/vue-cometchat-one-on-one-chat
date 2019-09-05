<template>
  <div
    v-if="loggedIn && activeContact"
    class="chat-page"
  >
    <navbar/>
    <div class="chat-container">
      <chat-sidebar
        :contacts="contacts"
        :active-contact-id="activeContactUid"
        @select-contact="setActiveContactUid"
      />
      <chat-main :active-contact="activeContact"/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import ChatSidebar from '@/components/ChatSidebar'
import ChatMain from '@/components/ChatMain'
import { CometChat } from '@cometchat-pro/chat'
import Vue from 'vue'

export default {
  components: {
    Navbar,
    ChatSidebar,
    ChatMain
  },

  data () {
    return {
      loggedIn: false,
      contacts: [],
      activeContactUid: null
    }
  },

  computed: {
    activeContact () {
      return this.contacts
        .find(user => user.uid === this.activeContactUid)
    }
  },

  created () {
    this.loadCurrentUser()
    this.loadContacts()

    const listenerID = 'UNIQUE_LISTENER_ID'
    CometChat.addUserListener(
      listenerID,
      new CometChat.UserListener({
        onUserOnline: onlineUser => {
          const index = this.contacts.findIndex(user => user.uid === onlineUser.uid)
          this.$set(this.contacts, index, { ...this.contacts[index], isOnline: true })
        },

        onUserOffline: offlineUser => {
          const index = this.contacts.findIndex(user => user.uid === offlineUser.uid)
          this.$set(this.contacts, index, { ...this.contacts[index], isOnline: false })
        }
      })
    )
  },

  methods: {
    loadCurrentUser () {
      CometChat.getLoggedinUser()
        .then(user => {
          this.loggedIn = true
          Vue.prototype.$currentUser = {
            uid: user.uid,
            name: user.name,
            avatar: user.avatar
          }
        })
        .catch(error => {
          this.$router.push({ name: 'login' })
          console.log('error', error)
        })
    },

    loadContacts () {
      const usersRequest = new CometChat.UsersRequestBuilder().setLimit(5).build()
      usersRequest.fetchNext()
        .then(usersList => {
          this.contacts = usersList.map(user => ({
            uid: user.uid,
            name: user.name,
            avatar: user.avatar,
            isOnline: user.status === 'online'
          }))
          this.activeContactUid = this.contacts[0].uid
        })
    },

    setActiveContactUid (uid) {
      this.activeContactUid = uid
    }
  }
}
</script>

<style lang="stylus" scoped>
.chat-page
  background: url('../assets/chat-background.svg')
  background-repeat: no-repeat
  background-size: cover
  background-position: top center
  min-height: 100%

.chat-container
  background: #FFFFFE
  box-shadow: 0px 2px 36px rgba(45, 49, 63, 0.357436)
  border-radius: 6px
  margin: 50px auto 50px
  max-width: 800px
  width: calc(100% - 20px)
  height: 500px
  min-height: 500px
  display: flex
  justify-content: space-between

.chat-sidebar
  width: 240px
.chat-main
  flex: 1

@media (max-width: 635px)
  .chat-sidebar
    width: 90px
</style>
