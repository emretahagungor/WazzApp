import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Seperator from "./Seperator";


import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Cell = ({onPress, icon, title, style}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}
        style={{ flexDirection: "row", alignItems:'center' }}>
            <View style={[styles.iconContainer]}>
          <Ionicons name={icon} size={24} color={'white'}/>
          </View>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <Seperator/>
    </View>
  )
}

export default Cell

const styles = StyleSheet.create({
    iconContainer : {
        backgroundColor:'green',
        borderRadius:8,
        padding:3,
        marginHorizontal:8,
        alignItems:'center'
    },
    title:{
        fontSize:18,
        fontWeight:'bold'
    }
})