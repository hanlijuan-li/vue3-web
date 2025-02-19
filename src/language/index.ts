import {createI18n} from "vue-i18n";
import {getBrowerLang} from "@/utils";
import zh from './modules/zh'
import en from './modules/en'

console.log(en)

const i18n = createI18n({
    allowComposition: true,
    legacy: false,
    locale: getBrowerLang(),
    messages: {
        zh,
        en
    }
})

export default i18n