export const URL_BASE =  'http://123.16.53.210:9000'
export const URL_REALTIME =  'http://123.16.53.210:9005'
export const URL_SOCKET = "http://123.16.53.210:9006"
export const API = {

    REGISTER: URL_BASE + '/api/Users/Regrister',
    LOGIN: URL_BASE + '/api/UserBase/Login',
    LOAD_USER_PROFILE: URL_BASE + "/api/Users/LoadUserProfile",

    //Api realtime
    CREATE_MSG_GROUP: URL_REALTIME + "/socket/createmsggroups",
    LOAD_MSG_GROUP: URL_REALTIME + "/socket/loadmgsgroups",
    DETAIL_MSG: URL_REALTIME + "/socket/detailmessagebygroup",


}