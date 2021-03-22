import React, {Component, useRef} from 'react';
import {Image, StyleSheet, ImageBackground} from 'react-native';
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
} from 'native-base';
import {useState} from 'react';
const cards = [
  {
    text: 'Go Green',
    name: 'One',
    image: require('../assets/forest1.jpg'),
  },
  {
    text: 'Make planet earth alive again',
    name: 'One',
    image: require('../assets/forest2.jpg'),
  },
  {
    text: 'Green planet',
    name: 'One',
    image: require('../assets/forest3.jpg'),
  },
];

const CustomCarousel = () => {
  return (
    <View>
      <DeckSwiper
        looping={true}
        dataSource={cards}
        renderItem={(item) => (
          <Card style={styles.card}>
            <CardItem cardBody>
             
              <ImageBackground
                style={{height: 200, flex: 1, borderRadius: 20}}
                source={item.image}>
               
                <Text style={styles.heading}>{item.text}</Text>
              </ImageBackground>
            </CardItem>
          </Card>
        )}
      />
      
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  container: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  card: {
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 20,
  },
  heading:{
    color:"#fff",
    textAlign:"center",
    fontSize:30,
    marginTop:70
  }
});
