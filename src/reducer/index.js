import {combineReducers} from 'redux'

import plant from './plant'
import booking from './booking'
import auth from './auth'

export default combineReducers({
    auth,
    plant,
    booking,
})