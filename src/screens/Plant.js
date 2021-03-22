import React,{useEffect} from 'react'
import { View, SafeAreaView,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import {getPlant} from '../action/plant'
import {Container,H1,Picker} from 'native-base'
import PlantCard from '../components/PlantCard'
import EmptyContainer from '../components/EmptyContainer'
const Plant = ({plantState,getPlant,navigation}) => {


    useEffect(()=>{
        getPlant()
    },[])
    if (plantState.isLoading) {
        return <EmptyContainer />;
      }
    return (
      <SafeAreaView style={styles.container}>
           <H1 style={{textAlign:'center'}}>Book Here!</H1>
         <View style={styles.list}>
           
             {plantState.plants.map((item)=>(
                 <View style={styles.box} key={item.pid}>
                     <PlantCard item={item} navigation={navigation}/>
                 </View>
             ))}
         </View>

      </SafeAreaView>
    )
}

const mapStateToProps=(state)=>({
    plantState:state.plant
})
const mapDispatchToProps={
    getPlant
}

export default connect(mapStateToProps,mapDispatchToProps)(Plant);
const styles = StyleSheet.create({
    container: {
        marginTop:15,
      justifyContent: 'flex-start',
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    list:{
        flexDirection:"row",
        flexWrap:'wrap',
        marginTop:10
    },
    box:{
        width:'48%',
        marginLeft:5
    }
  });