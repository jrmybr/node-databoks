<template>
  <section id='home-page'>
    <div id="home-header">
      <div id="header-title"> Databoks </div>
      <div id="header-link">
        <a href="#">About</a>
        <a href="#">Sign In</a>
      </div>
    </div>

    <div id="home-main">
      <div id="title-wrapper">
        <h1> Databoks </h1>
        <h2> Create your 2.0 fitness event </h2>
        <button type="button" class="more-white">Show more</button>
      </div>

      <div id="form-wrapper">
        <h3>New to Databoks?</h3>
        <h4>Create your free account to get started</h4>
        <form v-on:submit="onSubmit">
            <input type="email" v-model="email" placeholder="Email"/>
            <input type="password" v-model="password" placeholder="password"/>
            <button type="submit">Sign up</button>
        </form>

        <hr>

        <button v-on:click="onGoogle" type="button">Sign up with Google</button>
        <!-- <button type="button">Sign up with Facebook</button> -->
      </div>
  </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { REGISTER } from '@/store/actions.type'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    // postit (url, mybody) {
    //   return fetch(url, {method: "post", headers:{"content-type": "application/json"},body: JSON.stringify(mybody)})
    // },
    getit (url) {
      return fetch(url, {headers: {"content-type": 'application/x-www-form-urlencoded'}})
    },
    onSubmit () {
      // this.postit('http://localhost:5000/api/auth/register', {email: this.email, password: this.password}).then(res => {console.log(res);})
      const registerPromise = new Promise((resolve, reject) => {
        this.$store
          .dispatch(REGISTER, {
            email: this.email,
            password: this.password
          })
          .then((res) => {
            resolve(res.data)
          })
      })
      registerPromise.then((data) => {
          console.log(data)
          this.$router.push({name: "profile"})
        })
    },
    onGoogle () {
      this.getit('http://localhost:5000/auth/google').then( res => {console.log(res);})
      // this.$auth.authenticate('google').then((res) => {
      //   console.log(res);
      // })
    }
  }
}
</script>

<style scoped lang='sass'>
  @import "./../assets/styles/colors"
  @import "./../assets/styles/mixins"

  #home-page
    height: auto
    min-height: 90vh
    background-color: $blue
    color: $white
    padding-bottom: 50px
    #home-header
      display: flex
      flex-direction: row
      min-height: 50px
      align-items: center
      justify-content: space-between
      background-color: #3334
      #header-title, #header-link
        padding: 0 15px
      #header-title
        @include header-title
        min-width: 40%
        @media screen and ('min-width': 768px)
          min-width: 60%
      #header-link
        display: flex
        flex-grow: 2
        justify-content: space-around
        a
          min-width: 50%
          text-align: center
          color: white
          text-decoration: none
          font-size: 90%
    #home-main
      display: flex
      // justify-content: space-around
      align-items: center
      flex-direction: column
      // min-height: 90%
      @media screen and ('min-width': 768px)
        flex-direction: row
      #title-wrapper
        @include home-title
        margin: 50px
        text-align: center
        h2
          font-size: 90%
        button.more-white
          @include button-more
      #form-wrapper
        display: flex
        flex-direction: column
        min-width: 66%
        h3
          margin-bottom: 0
          letter-spacing: -1px
        h4
          margin-top: 10px
        form
          display: flex
          flex-direction: column
          input
            @include input-style


</style>
