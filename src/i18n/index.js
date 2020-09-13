import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enIView from 'iview/dist/locale/en-US'
import zhIView from 'iview/dist/locale/zh-CN'
import esIView from 'iview/dist/locale/es-ES'

import en from './en'
import zh from './zh'
import es from './es'

Vue.use(VueI18n)
Vue.locale = () => {}

const messages = {
  en: { ...enIView, ...en },
  zh: { ...zhIView, ...zh },
  es: { ...esIView, ...es }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh',
  messages
})

export default i18n
