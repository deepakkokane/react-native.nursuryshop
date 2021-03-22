import React,{useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Container, Content, Button, Form, Input, Item} from 'native-base';
import leaf from '../assets/leaf.png';
import {signIn} from '../action/auth'
import { connect } from 'react-redux';

const SignIn = ({navigation,signIn}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn=async()=>{
    signIn({email,password})
  }

  return (
    <Container>
      <Text style={styles.heading}>SignIn!</Text>
      <Content>
        <Image
          source={leaf}
          style={{width: null, height: 200}}
          resizeMode="contain"
        />
        <Form style={styles.form}>
          <Item rounded block style={styles.formitem}>
            <Input
              style={{marginLeft: 10}}
              placeholderTextColor="#0D0D0D"
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item rounded block style={styles.formitem}>
            <Input
              style={{marginLeft: 10}}
              placeholderTextColor="#0D0D0D"
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </Item>
          <Button style={styles.btn} block rounded  success onPress={()=>handleSignIn()}>
              <Text>SignIn</Text>
            </Button>
        </Form>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{marginTop: 10}}>
          <Text style={{color: '#6A1B4D', textAlign: 'center'}}>
            Do not have an account, SignUp here
          </Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

const mapDispatchToProps={
  signIn:(data)=>signIn(data)
}

export default connect(null,mapDispatchToProps)( SignIn);

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 10,
  },
  formitem: {
    marginTop: 15,
    borderColor: '#758283',
  },
  btn: {
    marginTop: 15,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    color: '#1C8D73',
    marginTop: 10,
  },
});
