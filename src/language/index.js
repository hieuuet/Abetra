import { strings } from "./i18n";

export const TEXT_REGISTER = () => ({
  Register: strings("register.btn_register"),
  InputRePass: strings("register.input_rePass"),
  InputName: strings("register.input_fullname"),
  AgreeTerm: strings("register.agree_term"),
  HasAccount: strings("register.has_account"),
  PassRequired: strings("register.pass_required"),
  PassNotMatch: strings("register.pass_not_match"),
  PassLenght: strings("register.pass_lenght"),
  RequiredTerm: strings("register.required_term")
});

export const TEXT_LOGIN = () => ({
  InputPhone: strings("login.input_phone"),
  InputPass: strings("login.input_pass"),
  NotAccount: strings("login.not_account"),
  LoginGuest: strings("login.login_guest"),
  Register: TEXT_REGISTER().Register,
  NotActive: strings("login.not_active"),
  NotVerify: strings("login.not_verify"),
  NotFoundPhone: strings("login.not_found_phone")
});
export const TEXT_COMMON = () => ({
  LoginFB: strings("common.login_fb"),
  Login: strings("common.btn_login"),
  Guest: strings("common.btn_guest"),
  Empty: strings("common.empty"),
  FanPage: strings("common.txt_fanpage"),
  Confirm: strings("common.confirm"),
  OK: strings("common.ok"),
  Cancel: strings("common.cancel"),
  Next: strings("common.next"),
  InputPhone: strings("login.input_phone"),
  NotFoundUserId: strings("common.not_found_userId"),
  GetDataFBFail: strings("common.get_data_FB_fail"),
  FeatureDev: strings("common.feature_develop"),
  LoadProfileFail: strings("common.load_profile_fail"),
  UploadImageFail: strings("common.upload_image_fail"),
  FeatureRequestLogin: strings("common.feature_request_login")
});
export const TEXT_VERIFY = () => ({
  VerifyPhone: strings("verify.verify_phone"),
  InputCode: strings("verify.input_code"),
  Info: strings("verify.info"),
  NotRecevie: strings("verify.txt_notReceive"),
  PhoneIncorrect: strings("verify.txt_phoneIncorrect"),
  Resend: strings("verify.btn_reSend"),
  ReInput: strings("verify.btn_reInput"),
  RequiredOTP: strings("verify.required_otp"),
  VerifyFail: strings("verify.verify_fail")
});
export const TEXT_CHANGE_PASSWORD = () => ({
  ChangePass: strings("changePass.btn_changePass"),
  InputOldPass: strings("changePass.oldPass"),
  InputNewPass: strings("changePass.newPass"),
  InputReNewPass: strings("changePass.reNewPass"),
  Guest: strings("common.btn_guest"),
  FanPage: strings("common.txt_fanpage"),
  Confirm: strings("common.confirm"),
  Cancel: strings("common.cancel"),
  ProfileNotFound: strings("common.profile_notfound"),
  RequirePass: strings("changePass.require_pass"),
  PassNotMatch: strings("changePass.pass_not_match"),
  ChangePassFail: strings("changePass.change_pass_fail")
});

export const TEXT_CHANGE_PHONE = () => ({
  ChangePhone: strings("changePhone.btn_changePhone"),
  NewPhone: strings("changePhone.newPhone"),
  InputCode: TEXT_VERIFY().InputCode,
  Confirm: TEXT_COMMON().Confirm,
  Cancel: TEXT_COMMON().Cancel,
  FanPage: TEXT_COMMON().FanPage,
  InfoSMS: strings("changePhone.info_sms"),
  ProfileNotFound: strings("common.profile_notfound"),
  RequiredInput: strings("changePhone.require_input"),
  ChangePhoneFail: strings("changePhone.change_phone_fail")
});

export const TEXT_INTRO = () => ({
  IntroTitle: strings("intro.intro_title"),
  Continue: strings("intro.continue")
});
export const TEXT_LANGUAGE = () => ({
  LanguageTitle: strings("language.language_title")
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

export const TEXT_PROFILE = () => ({
  Account: strings("profile.account"),
  Member: strings("profile.member"),
  Activity: strings("profile.activity"),
  ChangePass: strings("profile.change_pass"),
  Birth_day: strings("profile.birth_day"),
  Email: strings("profile.email"),
  Mobile: strings("profile.mobile"),
  Gender: strings("profile.gender"),
  Man: strings("profile.man"),
  Women: strings("profile.women"),
  Undefined: strings("profile.undefined"),
  Address: strings("profile.address"),
  Intro: strings("profile.intro"),
  Marked: strings("profile.marked"),
  Follow: strings("profile.follow"),
  EventJoin: strings("profile.event_join"),
  DateRegister: strings("profile.date_register"),
  DateExpire: strings("profile.date_expire"),
  Certificate: strings("profile.certificate_link"),
  Term: strings("profile.term_link"),
  Save: strings("profile.save"),
  Edit: strings("profile.edit"),
  NotRegisterMember: strings("profile.not_register_member"),
  ReferBenifet: strings("profile.refer_benifet"),
  TypeBusiness: strings("profile.type_business"),
  CreateNewPost: strings("profile.create_new_post"),
  InputPost: strings("profile.input_post"),
  PostCreated: strings("profile.post_created"),
  RegisterNow: strings("profile.register_now"),
  WaitingAccept: strings("profile.waiting_accept"),
  Message: strings("profile.message"),
  FollowAction: strings("profile.follow_action"),
  CreateChatFail: strings("chat.create_chat_fail")
});

export const TEXT_REGISTER_MEMBER = phone => ({
  RegisterMember: strings("register_member.title_register"),
  RankMember: strings("register_member.rank_member"),
  TypeBusiness: strings("register_member.type_business"),
  ModelBusiness: strings("register_member.modal_business"),
  Personal: strings("register_member.personal"),
  Business: strings("register_member.business"),
  ConfirmContact: strings("register_member.confirm_contact"),
  GuideRegister: strings("register_member.guide_register"),
  Register: strings("register_member.register"),
  InputName: strings("register.input_fullname"),
  InputPhone: strings("login.input_phone"),
  Name: strings("register_member.name"),
  Phone: strings("register_member.phone"),
  ContactTitle: strings("register_member.contact_title"),
  ContactInfo: strings("register_member.contact_info", { phone }),
  ProfileNotFound: strings("common.profile_notfound"),
  BusinessTypeRequired: strings("register_member.required_type_business"),
  BusinessModalRequired: strings("register_member.required_modal_business"),
  RankRequired: strings("register_member.required_rank"),
  ContactRequired: strings("register_member.required_contact"),
  RegisterFail: strings("register_member.register_fail")
});
export const TEXT_ALERT = () => ({
  NotiTitle: strings("alert.noti_title"),
  NotiMessage: strings("alert.noti_body_normal"),
  TextPositive: strings("alert.text_positive"),
  TextNegative: strings("alert.text_negative")
});

export const TEXT_CERTIFICATE = () => ({
  CertificateTitle: strings("certificate.certificate_title")
});
export const TEXT_BENIFET = () => ({
  CertificateTitle: strings("benifet.benifet_title")
});

export const TEXT_SEARCH = () => ({
  Search: strings("common.search"),
  Post: strings("search.post"),
  Business: strings("search.business"),
  Message: strings("search.message"),
  Account: strings("search.account")
});
export const TEXT_MESSAGE = () => ({
  MessageTitle: strings("message.message"),
  Chanel: strings("message.chanel")
});
export const TEXT_INTERPRISE = () => ({
  Address: strings("profile.address"),
  Folow: strings("enterprise.folow"),
  EnableNoti: strings("enterprise.enable_noti"),
  Message: strings("enterprise.message"),
  MessageDesc: strings("enterprise.message_desc"),
  Empty: strings("common.empty"),
  CreateRoomFail: strings("enterprise.create_room_fail")
});

export const TEXT_INPUTPHONE = () => ({
  PhoneInvalid: strings("inputPhone.phoneInvalid"),
  UpdatePhoneFail: strings("inputPhone.updatePhoneFail"),
  RequestOTPFail: strings("inputPhone.requestOTPFail")
});

export const TEXT_POPUP_GUEST = () => ({
  GuestToRegister: strings("popup_guest.guest_to_register"),
  Later: strings("popup_guest.later"),
  RegisterNow: strings("popup_guest.register_now")
});

export const TEXT_EVENT = () => ({
  EventTitle: strings("event.event_title"),
  HasJoin: strings("event.has_join_event"),
  JoinSuccess: strings("event.join_event_succes"),
  JoinFail: strings("event.join_event_fail"),
  JoinEvent: strings("event.join_event"),
  Join: strings("event.join"),
  More: strings("event.more"),
  Less: strings("event.less")
});
export const TEXT_MENU_POST = () => ({
  SavePost: strings("menu_post.save"),
  UnsavePost: strings("menu_post.unsave"),
  Report: strings("menu_post.report"),
  SavePostSuccess: strings("menu_post.save_post_success"),
  SavePostFail: strings("menu_post.save_post_fail"),
  UnsavePostSuccess: strings("menu_post.unsave_post_success"),
  UnsavePostFail: strings("menu_post.unsave_post_fail")
});

export const TEXT_POLL_VOTE = () => ({
  ErrorOccurred: strings("poll_vote.error_occurred"),
  ErrorLike: strings("poll_vote.error_like")
});

export const TEXT_CREATE_POST = () => ({
  CreatePost: strings("create_post.create_post"),
  ContentPost: strings("create_post.content_post"),
  TitleEvent: strings("create_post.title_event"),
  TimeStart: strings("create_post.time_start"),
  Address: strings("create_post.address"),
  AddToPost: strings("create_post.add_to_post"),
  PollVote: strings("create_post.poll_vote"),
  Event: strings("create_post.event"),
  Post: strings("create_post.post"),
  Option: strings("create_post.option"),
  CreatePostFail: strings("create_post.create_post_fail"),
  InvalidTime: strings("create_post.invalid_time"),
  CreatePostSuccess: strings("create_post.create_event_success")
});

export const TEXT_CHAT = () => ({
  CreateChatFail: strings("chat.create_chat_fail")
});

export const TEXT_TYPE_ACCOUNT = () => ({
  Admin: strings("type_account.admin"),
  Personal: strings("type_account.personal"),
  Enterprise: strings("type_account.enterprise"),
  Guest: strings("type_account.guest")
});
export const TEXT_POST = () => ({
  DetailPost: strings("post.detail_post"),
  Join: strings("post.join"),
  Like: strings("post.like"),
  Share: strings("post.share"),
  Cmt: strings("post.cmt")
});
export const LOCATION = () => ({
  SearchLocation: strings("location.search_location"),
  AlertLocation: strings("location.alert_location")
});
