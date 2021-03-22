import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import CustomHeader from './layout/CustomHeader';
import {connect, useDispatch} from 'react-redux';
import {IS_AUTHENTICATED, SET_USER} from './action/action.types';
import Home from './screens/Home';
import Bookings from './screens/Bookings';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import EmptyContainer from './components/EmptyContainer';
import CustomFooter from './layout/CustomFooter'
import BookPlant from './screens/BookPlant';
import PlantCard from './components/PlantCard';
import BookingDetails from './pages/BookingDetails';
const Stack = createStackNavigator();


const App = ({authState}) => {
  const dispatch = useDispatch();
  const onAuthStateChanged =  (user) => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });

       database()
        .ref(`/users/${user._user.uid}`)
        .on('value', (snapshot) => {
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (authState.isLoading) {
    return <EmptyContainer />;
  }

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        header:(props)=><CustomHeader {...props}/>,
      
      }}>
        {authState.isAuthenticated ? (
          <>
            <Stack.Screen component={CustomFooter}  name="CustomFooter" />
            <Stack.Screen component={BookPlant} name="BookPlant"/>
            <Stack.Screen component={BookingDetails} name="BookingDetails"/>
          </>
        ) : (
          <>
            <Stack.Screen component={SignIn} name="SignIn" />
            <Stack.Screen component={SignUp} name="SignUp" />
          </>
        )}
      </Stack.Navigator>
        
     </NavigationContainer>
    
    </>
  );
};



const mapStateToProps = (state) => ({
  authState: state.auth,
});



export default connect(mapStateToProps)(App);
