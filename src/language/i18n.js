import ReactNative from "react-native";
import I18n from "react-native-i18n";
import store from "../store";
// Import all locales
import en from "./en.json";
import vi from "./vi.json";

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  vi
};

// const language = store.getState().currentLanguage.Code;
// console.log("llll", language);
// let currentLan = language.substring(0, 2);
// console.log("ffff", currentLan);

// if (currentLan !== "vi" && currentLan !== "en") currentLan = "vi";
// console.log("currentLan", currentLan);

// I18n.locale = currentLan;
const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL =
  currentLocale.indexOf("he") === 0 || currentLocale.indexOf("ar") === 0;

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  const language = store.getState().currentLanguage.Code;
  let currentLan = language.substring(0, 2);

  if (currentLan !== "vi" && currentLan !== "en") currentLan = "vi";
  // console.log("currentLan-name", name);

  I18n.locale = currentLan;

  return I18n.t(name, params);
}

export default I18n;
