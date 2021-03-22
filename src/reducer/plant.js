import {SET_PLANTS} from "../action/action.types"

const initialState={
    plants:null,
    isLoading:true
}

export default (state=initialState,action)=>{


    switch (action.type) {
        case SET_PLANTS:
            return {
                ...state,
                plants:action.payload,
                isLoading:false
            }
            
    
        default:
            return state;
    }
}