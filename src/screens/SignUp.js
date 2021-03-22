import React, {useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {signUp} from '../action/auth';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {connect} from 'react-redux';

import leaf from '../assets/leaf.png';

const SignUp = ({signUp}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = () => {
    signUp({email, password, address, phone, firstName, lastName});
  };

  return (
    <Container>
      <Text style={styles.heading}>
          SignUp!
        </Text>
      <Content padder>
        
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Image
            source={leaf}
            style={{width: null, height: 200, marginTop: 10}}
            resizeMode="contain"
          />
          <Form style={styles.form}>
            <Item regular bordered style={styles.formitem}>
              <Input
                style={{marginLeft: 10}}
                placeholderTextColor="#0D0D0D"
                placeholder="Email"
                value={email}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
              />
            </Item>
            <Item regular bordered style={styles.formitem}>
              <Input
                style={{marginLeft: 10}}
                placeholderTextColor="#0D0D0D"
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </Item>
            <Item regular bordered style={styles.formitem}>
              <Input
                style={{marginLeft: 10}}
                placeholderTextColor="#0D0D0D"
                placeholder="FirstName"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              />
            </Item>
            <Item regular bordered style={styles.formitem}>
              <Input
                style={{marginLeft: 10}}
                placeholderTextColor="#0D0D0D"
                placeholder="LastName"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </Item>
            <Item regular bordered style={styles.formitem}>
              <Input
                style={{marginLeft: 10}}
                placeholderTextColor="#0D0D0D"
                placeholder="Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </Item>
            <Item regular bordered style={styles.formitem}>
              <Input
                style={{marginLeft: 10}}
                placeholderTextColor="#0D0D0D"
                placeholder="Phone"
                value={phone}
                maxLength={10}
                keyboardType="number-pad"
                onChangeText={(text) => setPhone(text)}
              />
            </Item>

            <Button style={styles.btn} onPress={() => handleSignUp()} success>
              <Text>SignUp</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

const mapDispatchToProps = {
  signUp: (data) => signUp(data),
};

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 10,
  },
  formitem: {
    marginTop: 15,
    backgroundColor: '#758283',
  },
  btn: {
    marginTop: 15,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    color: '#1C8D73',
  },
});
