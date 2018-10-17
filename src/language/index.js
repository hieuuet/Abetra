import { strings } from "./i18n";
export const TEXT_REGISTER  = () => ( {
  Register: strings("register.btn_register"),
  InputRePass: strings("register.input_rePass"),
  InputName: strings("register.input_fullname"),
  AgreeTerm: strings("register.agree_term"),
  HasAccount: strings("register.has_account")
});
export const TEXT_LOGIN  = () => ({
  InputPhone: strings("login.input_phone"),
  InputPass: strings("login.input_pass"),
  NotAccount: strings("login.not_account"),
  LoginGuest: strings("login.login_guest"),
  Register: TEXT_REGISTER().Register
});

export const TEXT_COMMON = () => ({
  LoginFB: strings("common.login_fb"),
  Login: strings("common.btn_login"),
  Guest: strings("common.btn_guest"),
  FanPage: strings("common.txt_fanpage"),
  Confirm: strings("common.confirm"),
  Cancel: strings("common.cancel")
});
export const TEXT_VERIFY = () => ({
  VerifyPhone: strings("verify.verify_phone"),
  InputCode: strings("verify.input_code"),
  Info: strings("verify.info"),
  NotRecevie: strings("verify.txt_notReceive"),
  PhoneIncorrect: strings("verify.txt_phoneIncorrect"),
  Resend: strings("verify.btn_reSend"),
  ReInput: strings("verify.btn_reInput")
});
export const TEXT_CHANGE_PASSWORD = () => ({
  ChangePass: strings("changePass.btn_changePass"),
  InputOldPass: strings("changePass.oldPass"),
  InputNewPass: strings("changePass.newPass"),
  InputReNewPass: strings("changePass.reNewPass"),
  Guest: strings("common.btn_guest"),
  FanPage: strings("common.txt_fanpage")
});

export const TEXT_CHANGE_PHONE = () => ({
  ChangePhone: strings("changePhone.btn_changePhone"),
  NewPhone: strings("changePhone.newPhone"),
  InputCode: TEXT_VERIFY().InputCode,
  Confirm: TEXT_COMMON().Confirm,
  Cancel: TEXT_COMMON().Cancel,
  FanPage: TEXT_COMMON().FanPage
});

export const TEXT_INTRO = () => ({
  IntroTitle: strings("intro.intro_title"),
  Continue: strings("intro.continue")
});
export const TEXT_LANGUAGE = () => ({
  LanguageTitle: strings("language.language_title")
});
export const TEXT_EVENT = () => ({
  EventTitle: strings("event.event_title")
});

export const TEXT_MENU = () => {
  return {
    MarkedPost: strings("menu.marked"),
    Login: TEXT_COMMON().Login,
    Logout: strings("menu.logout"),
    Event: TEXT_EVENT().EventTitle,
    Nearly: strings("menu.nearly"),
    Promotion: strings("menu.promotion"),
    Intro: strings("menu.intro"),
    Guide: strings("menu.guide"),
    Term: strings("menu.term"),
    Language: TEXT_LANGUAGE().LanguageTitle,
    Support: strings("menu.support")
  };
};
