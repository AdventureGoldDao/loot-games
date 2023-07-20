import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

import enUsTrans from "./locales/en_US.json";
import koKRTrans from "./locales/ko_KR.json";
import zhCNTrans from "./locales/zh_CN.json";
import jaJPTrans from "./locales/ja_JP.json";


i18n.use(LanguageDetector)
  .use(initReactI18next) //init i18next
  .init({
    resources: {
      en: {
        translation: enUsTrans,
      },
      ko: {
        translation: koKRTrans,
      },
      zh: {
        translation: zhCNTrans,
      },
      ja: {
        translation: jaJPTrans
      }
    },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n;