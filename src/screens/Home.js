import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image,TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Title,
  Button,
  Body,
  Right,
} from 'native-base';
import CustomCarousel from '../components/CustomCarousel';
import {connect} from 'react-redux';
import {getPlant} from '../action/plant';
import {useEffect} from 'react/cjs/react.development';

const Home = ({plantState, getPlant,navigation}) => {
  const plants = plantState?.plants;

  useEffect(() => {
    getPlant();
  }, []);

  return (
    <Container style={{flex:1,justifyContent:"flex-start",flexDirection:'column'}}>
        <View style={{height:210}}>
      <CustomCarousel />
      </View>
     <View style={{marginLeft:5,marginTop:5 ,flexDirection:"row"}}>
     <Text style={{fontSize:20}}>Vegitable</Text>
     <Right style={{marginLeft:5,marginTop:0 }}>
        <TouchableOpacity onPress={()=>navigation.navigate('Plant')}>
        <Text style={{fontSize:17,marginRight:10,color:"blue"}}>More..</Text>
        </TouchableOpacity>
     </Right>
     </View>
        
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Content>
          <ScrollView
            contentContainerStyle={{flexGrow: 1,marginTop:5, marginLeft: 5}}
            horizontal={true}>
            {plants?.map((item) => (
              <Card key={item.pid}>
                <Image
                  source={{uri: item.plantImage}}
                  style={{width: null, height: 100}}
                />
                <CardItem
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                  <Text style={{color: '#000', fontSize: 20}}>
                    {item.plantName}
                  </Text>
                  <View>
                    <Text note>Type: {item.plantType}</Text>
                  </View>
                  <Text>Price: Rs.{item.plantPrice}</Text>
                  <Body style={{marginTop: 5}}>
                    <Button
                      style={styles.btn}
                      onPress={() => navigation.navigate('BookPlant', {item})}>
                      <Text>Book</Text>
                    </Button>
                  </Body>
                </CardItem>
              </Card>
            ))}
          </ScrollView>
        </Content>
      </ScrollView>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  plantState: state.plant,
});
const mapDispatchToProps = {
  getPlant,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  btn: {
    borderRadius: 3,
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
});
