import {IS_AUTHENTICATED,SET_USER} from '../action/action.types'

const initialState={
    user:null,
    isAuthenticated:false,
    isLoading:true,
}

export default (state=initialState,action)=>{

    switch (action.type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated:action.payload,
                isLoading:false
            }
    
        case SET_USER:
            return {
                ...state,
                user:action.payload,
                isLoading:false
            }
        default:
            return state;
    }
}