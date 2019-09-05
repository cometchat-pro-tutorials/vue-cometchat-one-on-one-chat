<template>
  <div class="chat-sidebar">
    <div class="header">
      Contacts
    </div>
    <div class="contacts-list">
      <div
        v-for="user in contacts"
        :key="user.uid"
        class="contact-item"
        :class="{
          'active': user.uid === activeContactId,
          'online': user.isOnline
        }"
        @click="$emit('select-contact', user.uid)"
      >
        <div class="contact-avatar-wrapper">
          <img
            class="contact-avatar"
            :src="user.avatar"
          >
        </div>
        <span class="contact-name">
          {{ user.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contacts: {
      type: Array,
      default: () => ([])
    },

    activeContactId: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  font-family: 'Roboto', sans-serif
  font-weight: normal
  font-size: 15px
  line-height: 18px
  color: #2D313F
  padding: 20px 25px
  border-bottom: 1px solid #BDCCD7

.contacts-list
  padding-bottom: 20px

.contact-item
  height: 67px
  display: flex
  align-items: center
  cursor: pointer
  border-bottom: 1px solid rgba(189, 204, 215, 0.5)
  padding-left: 15px

.contact-item.active
  background: #1B47DB

.contact-item:not(.active):hover
  background: #ECF0FE

.contact-avatar
  width: 37px
  height: 37px
  border-radius: 50%
  margin-right: 10px

.contact-avatar-wrapper
  position: relative
  display: flex

.contact-avatar-wrapper:after
  content: ''
  display: block
  width: 10px
  height: 10px
  border-radius: 50%
  background: #BBBEBE
  position: absolute
  z-index: 9
  right: 10px
  bottom: 0

.contact-item.online .contact-avatar-wrapper:after
  background: #1BDB72

.contact-name
  font-family: 'Roboto', sans-serif
  font-size: 14px
  line-height: 16px
  color: #2D313F

.contact-item:hover .contact-name,
.contact-item.active .contact-name
  font-weight: 500

.contact-item.active .contact-name
  color: #FFF

@media (max-width: 635px)
  .header
    padding: 20px 0
    text-align: center
  .contact-name
    display: none
  .contact-avatar
    width: 40px
    height: 40px
    margin: 0
  .contact-item
    justify-content: center
    padding: 0
</style>
