import { combineReducers } from 'redux'
import {register} from './registerReducers'
import {login} from './loginReducers'
import {loadUserProfile} from './loadUserProfileReducers'
import {createMsgGroup} from './createMsgGroupReducers'
import {loadMsgGroup} from './loadMsgGroupReducers'
import {detailMsg} from './detailMsgReducers'


const appStore = combineReducers({
    register,
    login,
    loadUserProfile,
    createMsgGroup,
    loadMsgGroup,
    detailMsg

})
export default appStore
