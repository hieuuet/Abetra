import { combineReducers } from 'redux'
import {register} from './registerReducers'


const appStore = combineReducers({
    register,

})
export default appStore
