import React from 'react'
import { View,Image,StyleSheet } from 'react-native'
import {Card,CardItem,Title,Text,Button, Body,} from 'native-base'
const PlantCard = ({item,navigation}) => {
    
    return (
        <Card>
            <Image
            source={{uri:item.plantImage}} 
            style={{width:null,height:100}}
            />
            <CardItem style={{justifyContent:'flex-start',flexDirection:'column',alignItems:'flex-start'}} >
                <Text style={{color:"#000",fontSize:20,flex:0}}>{item.plantName}</Text>
               <View>
                    <Text  note>Type: {item.plantType}</Text>
               </View>
               <Text>
                  Price: Rs.{item.plantPrice}
               </Text>

              
            </CardItem>
           <CardItem style={{marginTop:0}}>
                <Body>
                <Button  style={styles.btn} onPress={()=>navigation.navigate('BookPlant',{item})}>
                   <Text>Book</Text>
               </Button>
                </Body>
           </CardItem>
        </Card>
    )
}

export default PlantCard;
const styles=StyleSheet.create({
   btn:{
        borderRadius:3,
        alignSelf:'center',
        paddingHorizontal:15
   }
})