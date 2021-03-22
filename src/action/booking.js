import {SET_BOOKINGS} from "./action.types";
import database from '@react-native-firebase/database';
import Snackbar from 'react-native-snackbar';

export const getBookings=(uid)=>async(dispatch)=>{
    try {
        database().ref(`/bookings/`).orderByChild('uid').equalTo(uid)
        .on("value",(snapshot)=>{

            if(snapshot.val())
            {
                dispatch({
                    type:SET_BOOKINGS,
                    payload:Object.values(snapshot.val())
                })
            }
            else{
                dispatch({
                    type:SET_BOOKINGS,
                    payload:[]
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const  changeBookingStatus=(bid)=>async(dispatch)=>{

                const status="Canceled"
    try {
        database().ref(`/bookings/${bid}`)
        .update({
            status
        })
        .then(()=>{
            Snackbar.show({
                text:"Booking Canceled",
                textColor:"#fff",
                backgroundColor:"#1FAA59"
              })
        })
    } catch (error) {
        console.log(error);
    }
}

export const removeBooking=(bid)=>async(dispatch)=>{

    try {
        database().ref(`/bookings/${bid}`)
        .remove()
        .then(()=>{
            Snackbar.show({
                text:"Booking Deleted",
                textColor:"#fff",
                backgroundColor:"red"
              })
        })
        
    } catch (error) {
        console.log(error);
    }

}
