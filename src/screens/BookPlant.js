import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
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
import {connect} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { number } from 'prop-types';
import database from '@react-native-firebase/database';
import shortid from 'shortid';
import Snackbar from 'react-native-snackbar';


const BookPlant = ({navigation, route, userState}) => {
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [plantPrice, setPlantPrice] = useState('');
  const [status, setStatus] = useState('Booked');
  const [bookBy, setBookBy] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date().toDateString());
  const [bookingForDate, setBookingForDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [plantImage, setPlantImage] = useState(null);
  const [address, setAddress] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [uid, setUid] = useState('')
  const [phone, setPhone] = useState('')

  const {item} = route.params;
  useEffect(() => {
    const {firstName, lastName,address,uid,phone} = userState.user;
    const {plantName, plantPrice, plantImage, plantType} = item;
    setPlantImage(plantImage);
    setPlantName(plantName);
    setPlantPrice(plantPrice);
    setPlantType(plantType);
    setBookBy(firstName + ' ' + lastName);
    setAddress(address)
    setUid(uid)
    setPhone(phone)
  }, []);

  const calculateAmount=(data)=>{
      setQuantity(data)
      const totalAmt=parseFloat(Number(plantPrice)*Number(data))
      setTotalAmount(totalAmt)
  }
  const handleBooking = async() => {

    try {
       if(!quantity || !bookingForDate){
         return Snackbar.show({
          text:"Please choose Quantity and Booking for Date",
          textColor:"#fff",
          backgroundColor:"#E6425E"
         })
       }
       const bid=shortid.generate()
       database().ref('/bookings/'+bid)
       .set({
         uid,
         bid,
         bookingDate,
         bookingForDate,
         address,
         bookBy,
         totalAmount,
         status,
         quantity,
         plantImage,
         plantName,
         plantPrice,
         phone

       })
       .then(()=>{
         Snackbar.show({
           text:"Booking Success",
           textColor:"#fff",
           backgroundColor:"#1FAA59"
         })
       })
       navigation.navigate("Bookings")
        
    } catch (error) {
      console.log(error);
    }
  };

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
                {plantName}
              </Title>

              <Right style={{marginRight: 10}}>
                <Text style={{color: '#000', marginTop: 5, fontSize: 17}}>
                  Type: {plantType}
                </Text>
              </Right>
            </View>
            <Text style={{color: '#000', marginTop: 5, fontSize: 17}}>
              Price: Rs.{plantPrice}
            </Text>
              <Text>
                Address: {address}
              </Text>
            <Text style={{color: '#000', marginTop: 5, fontSize: 17,fontWeight:'bold'}}>
              BookedBy: {bookBy}
            </Text>
          </Body>
        </CardItem>
        <CardItem style={{paddingTop:0}}>
          <Body>
            <Item floatingLabel style={{marginRight: 150, marginLeft: 0}}>
              <Label>Choose Quantity</Label>
              <Input
              keyboardType="number-pad"
                value={quantity}
                onChangeText={calculateAmount}
              />
            </Item>
            <Button
              style={{marginTop: 5}}
              transparent
              onPress={() => setDatePickerVisibility(!isDatePickerVisible)}>
              <Left style={{flexDirection: 'row'}}>
                <Text style={{marginLeft: 0,}}>
                  Choose Booking For Date:
                </Text>
                <Text>
                  <Icon type="MaterialCommunityIcons" name="calendar" />
                </Text>
              </Left>
            </Button>
            <Text>Booked For Date: {bookingForDate.toString()}</Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => setBookingForDate(new Date(date).toDateString())}
              onCancel={() => setDatePickerVisibility(false)}
            />
          </Body>
        </CardItem>
        <CardItem style={{paddingTop:0}}>
        <Body>
          <View style={{alignSelf:'flex-end'}}>
            
          <Text style={{fontSize: 22,fontWeight:'bold'}}>TotalAmount: Rs.{totalAmount}</Text>
            </View> 
            <Button onPress={()=>handleBooking()} block success style={{marginTop:10,borderRadius:5}}><Text>Book Now</Text></Button> 
        </Body>
        </CardItem>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  userState: state.auth,
});

export default connect(mapStateToProps)(BookPlant);

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
