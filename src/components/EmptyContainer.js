import React from 'react'
import { Container,Spinner } from 'native-base'


const EmptyContainer = () => {
    return (
       <Container style={{flex:1,justifyContent:"center",alignItems:"center"}}>
           <Spinner color="#1FAA59" size={90} />
       </Container>
    )
}

export default EmptyContainer;
