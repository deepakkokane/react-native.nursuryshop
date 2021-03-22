import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database";
import Snackbar from "react-native-snackbar";


export const signUp=(data)=>async(dispatch)=>{
    const {email,password,address,firstName,lastName,phone}=data;

    auth().createUserWithEmailAndPassword(email,password)
    .then((data)=>{

        database().ref('/users/'+data.user.uid)
        .set({
            firstName,
            lastName,
            address,
            phone,
            uid:data.user.uid
        })
        .then(()=>{
            Snackbar.show({
                text:"SignUp success",
                textColor:"#fff",
                backgroundColor:"#1FAA59"
            })
        })
    })
    .catch((err)=>{
        Snackbar.show({
            text:"SignUp Failed",
            textColor:"#fff",
            backgroundColor:"#E6425E"
        })
    })
    
}

export const signIn=(data)=>async(dispatch)=>{
    const {email,password}=data;

    auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
        Snackbar.show({
            text:"SignIn Success",
            textColor:"#fff",
            backgroundColor:"#1FAA59"
        })
    })
    .catch((err)=>{
        Snackbar.show({
            text:"SignIn Failed",
            textColor:"#fff",
            backgroundColor:"#E6425E"
        })
    })
}

export const SignOut=()=>async(dispatch)=>{
    auth().signOut()
    .then(()=>{
        Snackbar.show({
            text:"SignOut Success",
            textColor:"#fff",
            backgroundColor:"#1FAA59"
        })
    })
    .catch((err)=>{
        Snackbar.show({
            text:err.message,
            textColor:"#fff",
            backgroundColor:"#E6425E"
        })
    })
}

export const updateAddress=(data)=>async(dispatch)=>{

    const {address,uid}=data

    try {
        database().ref(`/users/${uid}`)
        .update({
            address
        })
        .then(()=>{
            Snackbar.show({
                text:"Address Updated",
                textColor:"#fff",
                backgroundColor:"#1FAA59"
            })
        })
    } catch (error) {
        console.log(error);
    }
}
export const updatePhone=(data)=>async(dispatch)=>{

    const {phone,uid}=data

    try {
        database().ref(`/users/${uid}`)
        .update({
            phone
        })
        .then(()=>{
            Snackbar.show({
                text:"Phone No Updated",
                textColor:"#fff",
                backgroundColor:"#1FAA59"
            })
        })
    } catch (error) {
        console.log(error);
    }
}