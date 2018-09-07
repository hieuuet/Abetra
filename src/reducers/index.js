import { combineReducers } from 'redux'
import {register} from './registerReducers'
import {login} from './loginReducers'


const appStore = combineReducers({
    register,
    login

})
export default appStore
