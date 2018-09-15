import { combineReducers } from 'redux'
import {register} from './registerReducers'
import {login} from './loginReducers'
import {loadUserProfile} from './loadUserProfileReducers'
import {createMsgGroup} from './createMsgGroupReducers'
import {loadMsgGroup} from './loadMsgGroupReducers'
import {detailMsg} from './detailMsgReducers'
import { getTopPost } from './getTopPostReducers'
import { createPost } from './createPostReducers'
import { createCmt } from './createCmtReducers'
import { searchCmt } from './searchCmtReducers'


const appStore = combineReducers({
    register,
    login,
    loadUserProfile,
    createMsgGroup,
    loadMsgGroup,
    detailMsg,
    getTopPost,
    createPost,
    createCmt,
    searchCmt


})
export default appStore
