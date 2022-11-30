import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_zh from "./zh.json";

const resources = {
  en: {
    translation: translation_en,
  },
  zh: {
    translation: translation_zh,
  },
};

i18n
  .use(initReactI18next) // i18n框架会通过使用react-i18next来初始化
  .init({
    resources, // 两个json文件
    lng: "zh", // 默认初始化语言
    // keySeparator: false, // we do not use keys in form messages.welcome
    // header.slogan
    interpolation: {
      escapeValue: false, // 不会为了防止xss攻击强行把html字符转换成字符串
    },
  });

export default i18n;