import { View, Text } from "react-native";
import React from "react";

const UserMessage = ({ name, message, isSent }) => {
  const bubbleStyle = {
    alignSelf: isSent ? "flex-end" : "flex-start",
    backgroundColor: isSent ? "#EEE4AB" : "#E5CB9F",
    borderRadius: 8,
    marginHorizontal:10,
    marginBottom: 10,
    padding: 9,
    maxWidth: 200,
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 16 }}>
      <View style={{ height: 30, width: 30, backgroundColor: '#EEE4AB', borderRadius: 28, marginHorizontal: 16, marginVertical: 6,alignItems:'center', justifyContent:'center' }}>
        <Text >{name.split(' ').reduce((prev,current) => `${prev}${current[0]}`, '')}</Text>
      </View>
      <View style={bubbleStyle}>
        <Text style={{ color: "white" }}>{message}</Text>
      </View>
    </View>
  );
};

export default UserMessage;
