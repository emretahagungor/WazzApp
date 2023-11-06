import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const Loading = () => {
  return (
    <View style={{backgroundColor: '#68A7AD', justifyContent:'center', alignItems:'center', flex:1}}>
      <Text style={{fontSize:65, color:'white', fontWeight:'900', marginBottom:55}}>Your login information is being checked</Text>
      <Text style={{fontSize:35, color:'white', fontWeight:'bold', marginBottom:35}}>Please wait !</Text>
      <ActivityIndicator size={'large'}/>
    </View>
  )
}

export default Loading