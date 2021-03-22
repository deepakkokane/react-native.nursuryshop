import React from 'react'
import { StyleSheet } from 'react-native'
import {SignOut} from '../action/auth'
import {Header,Body,Right,Title,Button,Icon,Text} from 'native-base'
import { connect } from 'react-redux'

const CustomHeader = ({authState,SignOut}) => {
    return (
       <Header
        androidStatusBarColor="#66AD47"
        noShadow
        style={{
            backgroundColor:"#6EC72D"
        }}
       >
          
           <Body>
           <Title style={{marginLeft:10}}>NursuryShop</Title>
           </Body>
           <Right>
               {authState.isAuthenticated && (
                   <Button transparent onPress={()=>SignOut()} style={{marginTop:10}}>
                       <Text style={{color:"#242B2E"}}>LogOut</Text>
                       <Icon  type="Feather" name="log-out"  fontSize={24} style={{color:"#242B2E"}}/>
                   </Button>
               )}
           </Right>
       </Header>
    )
}
const mapStateToProps = (state) => ({
    authState: state.auth,
  });

const mapDispatchToProps={
    SignOut
}
export default connect(mapStateToProps,mapDispatchToProps) (CustomHeader);
