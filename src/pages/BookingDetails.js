import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Image} from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Container,
  Button,
  Title,
  Input,
  Item,
  Label,
  Icon,
  Left,
  Right,
  Body,
} from 'native-base';

import {changeBookingStatus,removeBooking} from '../action/booking'
import { connect } from 'react-redux';

const BookingDetails = ({route, navigation,changeBookingStatus,removeBooking}) => {
  

  const {item} = route.params;
const deleteBooking=(bid)=>{
    removeBooking(bid)
    navigation.navigate("Bookings")
}

  return (
    <Container>
      <Card style={styles.card}>
        <Image
          source={{uri: item.plantImage}}
          style={{width: null, height: 150}}
          resizeMode="stretch"
        />

        <CardItem>
          <Body>
            <View style={{flexDirection: 'row'}}>
              <Title style={{color: '#000', fontSize: 25, marginLeft: 0}}>
                {item.plantName}
              </Title>
              <Right>
                <Text>
                  Status:{' '}
                  <Text
                    style={{
                      color: item.status == 'Booked' ? '#1FAA59' : '#E6425E',
                    }}>
                    {item.status}
                  </Text>
                </Text>
              </Right>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#000', marginTop: 5, fontSize: 17}}>
                Price: Rs.{item.plantPrice}
              </Text>
              <Right>
                <Text style={{color: '#000', marginTop: 5, fontSize: 17}}>
                  Quantity: {item.quantity}
                </Text>
              </Right>
            </View>

            <Text>Address: {item.address}</Text>
            <Text
              style={{
                color: '#000',
                marginTop: 5,
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              BookedBy: {item.bookBy}
            </Text>
          </Body>
        </CardItem>
        <CardItem style={{paddingTop: 0}}>
          <Body>
            <Text style={{color: '#000', marginTop: 5, fontSize: 17}}>
              Phone: {item.phone}
            </Text>
            <Text style={{color: '#000', marginTop: 5, fontSize: 17}}>
              BookingDate: {item.bookingDate}
            </Text>
            <Text style={{color: '#000', marginTop: 5, fontSize: 17}}>
              BookingForDate: {item.bookingForDate}
            </Text>
          </Body>
        </CardItem>
        <CardItem style={{paddingTop: 0}}>
          <Body>
            <View style={{flexDirection: 'column', alignSelf: 'flex-end'}}>
              <Text style={{marginLeft: 50}} note>
                BookingID: {item.bid}
              </Text>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                TotalAmount: Rs.{item.totalAmount}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Button onPress={()=>deleteBooking(item.bid)}  disabled={ item.status == 'Confirm'} danger>
                <Text>Delete</Text>
              </Button>
              <Right>
                <Button onPress={()=>changeBookingStatus(item.bid)} disabled={item.status == 'Confirm' || item.status == 'Canceled'} warning>
                  <Text>Cancel Booking</Text>
                </Button>
              </Right>
            </View>
          </Body>
        </CardItem>
      </Card>
    </Container>
  );
};

const mapDispatchToProps={
    changeBookingStatus:(bid)=>changeBookingStatus(bid),
    removeBooking:(bid)=>removeBooking(bid)
}

export default connect(null,mapDispatchToProps) (BookingDetails);
const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  carditem: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 5,
  },
});
