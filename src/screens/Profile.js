import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import avtar from '../assets/avatar.png';
import {
  Container,
  Content,
  Text,
  Input,
  Item,
  Button,
  Right,
  Form,
} from 'native-base';
import {connect} from 'react-redux';
import {updateAddress,updatePhone} from '../action/auth';
const Profile = ({userState, updateAddress,updatePhone}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [address, setAddress] = useState('');
    const [isUpdatePhone, setIsUpdatePhone] = useState(false)
    const [phone, setPhone] = useState('')
  const {user} = userState;
  const uid = user?.uid;

  const handleAddressUpdate = () => {
    updateAddress({uid, address});
    setIsUpdate(false);
    setAddress('');
  };

  const handlePhoneUpdate=()=>{
    updatePhone({uid,phone})
    setIsUpdatePhone(false)
    setPhone('')
  }

  return (
    <Container style={styles.container}>
      <Content>
        <View>
          <Image source={avtar} style={styles.image} />
          <Text
            style={{
              color: '#000',
              alignSelf: 'center',
              fontSize: 30,
              fontWeight: 'bold',
              marginTop: 0,
            }}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>

        <View style={styles.address}>
          <Text style={{color: '#000', fontSize: 20}}>
            Address: {user?.address}
          </Text>
          <TouchableOpacity onPress={() => setIsUpdate(!isUpdate)}>
            <Text style={{paddingLeft: 0, color: 'blue', marginTop: 5}}>
              Change Address
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formView}>
          {isUpdate ? (
            <Form style={styles.form}>
              <Item rounded success>
                <Input
                  style={{marginLeft: 5}}
                  placeholder="New Address"
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                />
              </Item>
              <Button style={styles.btn} onPress={handleAddressUpdate}>
                <Text>Update</Text>
              </Button>
            </Form>
          ) : null}
        </View>

        <View style={styles.phone}>
          <Text style={{color: '#000', fontSize: 20}}>
            Phone: {user?.phone}
          </Text>
          <TouchableOpacity onPress={()=>setIsUpdatePhone(!isUpdatePhone)}>
            <Text style={{paddingLeft: 0, color: 'blue', marginTop: 5}}>
              Change PhoneNumber
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formView}>
          {isUpdatePhone ? (
            <Form style={styles.form}>
              <Item rounded success>
                <Input
                  style={{marginLeft: 5}}
                  placeholder="New Phone Number"
                  value={phone}
                  maxLength={10}
                  keyboardType="number-pad"
                  onChangeText={(text) => setPhone(text)}
                />
              </Item>
              <Button style={styles.btn} onPress={handlePhoneUpdate}>
                <Text>Update</Text>
              </Button>
            </Form>
          ) : null}
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  userState: state.auth,
});

const mapDispatchToProps = {
  updateAddress: (data) => updateAddress(data),
  updatePhone:(data)=>updatePhone(data)
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  image: {
    width: 270,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  address: {
    marginTop: 15,
    marginLeft: 20,
  },
  phone: {
    marginLeft: 20,
    marginTop: 10,
  },
  form: {
    marginLeft: 15,
    marginRight: 30,
    marginTop: 10,
  },
  formView: {
    backgroundColor: '#CAD5E2',
    marginHorizontal: 3,
    borderRadius: 10,
    marginTop: 10,
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
    marginLeft: 5,
    paddingHorizontal: 5,
    backgroundColor: '#38CC77',
  },
});
