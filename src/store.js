import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'

import rootReaducer from './reducer'

const middleware=[thunk]

const store=createStore(
    rootReaducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;