import {SET_BOOKINGS} from '../action/action.types'

const initialState={
    bookings:null,
    isLoading:true
}

export default (state=initialState,action)=>{
    
    switch (action.type) {
        case SET_BOOKINGS:
            return {
                ...state,
                bookings:action.payload,
                isLoading:false
            }
    
        default:
            return state;
    }
}