import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import {getBookings} from '../action/booking';
import EmptyContainer from '../components/EmptyContainer';

import {
  Container,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Title,
  Text,
  Button,
H1
} from 'native-base';

const Bookings = ({bookingState, getBookings, userState, navigation}) => {
  
  const uid=userState?.user?.uid
  useEffect( () => {
    getBookings(uid);
  }, [uid]);

  if (bookingState.isLoading) {
    return <EmptyContainer />;
  }

  if(bookingState.bookings.length==0)
  {
    return(
      <Container style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <H1>No Bookings Found</H1>
      </Container>
    )
  }
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {bookingState.bookings.map((item) => (
          <View key={item.bid}>
            <Card style={styles.card}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: item.plantImage}}
                  style={styles.image}
                  resizeMode="stretch"
                />
                <View style={styles.info}>
                  <Text style={{fontWeight: 'bold'}}>{item.plantName}</Text>
                  <Text>Price: Rs.{item.plantPrice}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>
                    Status:{' '}
                    <Text
                      style={{
                        color: item.status == 'Booked' ? '#1FAA59' : '#E6425E',
                      }}>
                      {item.status}
                    </Text>
                  </Text>
                </View>
              </View>

              <CardItem style={{marginTop: 0}}>
                <Body>
                  <Text note>
                    BookingID: <Text note>{item.bid}</Text>
                  </Text>
                </Body>
                <View style={{marginBottom: 0}}>
                  <Right>
                    <Button
                      onPress={() =>
                        navigation.navigate('BookingDetails', {item})
                      }
                      transparent>
                      <Text>MoreInfo..</Text>
                    </Button>
                  </Right>
                </View>
              </CardItem>
            </Card>
          </View>
        ))}
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  userState: state.auth,
  bookingState: state.booking,
});

const mapDispatchToProps = {
  getBookings: (uid) => getBookings(uid),
};
export default connect(mapStateToProps, mapDispatchToProps)(Bookings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  card: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginTop: 10,
  },
  info: {
    marginLeft: 10,
  },
});
