import UtilService from '@/services/UtilService'
import Vue from 'vue'
import store from '@/store'
export default new Vue({
  computed: {
    googleRecaptchaKey () {
      return store.getters.googleRecaptchaKey || '6LdPM8MUAAAAAEc7SNWoA-KN4IH_sR_Rgwsb5gLk'
    },
    configs () {
      return store.getters.configs
    }
  },
  methods: {
    timeout (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    getCaptcha (act) {
      // Check grecaptch not exist
      return new Promise(async resolve => {
        if (!window.grecaptcha) {
          console.log('window is not ready, try to get new')
          await this.timeout(200)
          let result = await this.getCaptcha(act)
          resolve(result)
        } else {
          console.log('window is ready')
          let result = await this.request(act)
          resolve(result)
        }
      })
    },
    request (act) {
      return new Promise(resolve => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(this.googleRecaptchaKey, { action: act })
            .then((token) => {
              // validate reCaptcha response
              if (!token) {
                console.log('Can not get token from api')
                resolve(UtilService.generateRandomString(334))
              }
              console.log('get new token from api: ', token)
              resolve(token)
            }, (error) => {
              console.log(error)
              resolve(UtilService.generateRandomString(334))
            })
        })
      })
    }
  },
  watch: {
    googleRecaptchaKey (val) {
      if (!val) return
      const recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute(
        'src',
        'https://www.google.com/recaptcha/api.js?render=' +
          val
      )
      document.head.appendChild(recaptchaScript)
    }
  }
})
