import database from '@react-native-firebase/database'
import Snackbar from 'react-native-snackbar'
import {SET_PLANTS} from "./action.types"

export const getPlant=()=>async(dispatch)=>{
    try {
        database().ref('/plants/')
        .on('value',(snapshot)=>{
           
            if(snapshot.val())
            {
                dispatch({
                    type:SET_PLANTS,
                    payload:Object.values(snapshot.val())
                })
            }
            else{
                dispatch({
                    type:SET_PLANTS,
                    payload:[]
                })
            }
        })
        
    } catch (error) {
        console.log(error)
    }
}