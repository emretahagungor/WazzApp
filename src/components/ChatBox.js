import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Seperator from "./Seperator";

const ChatsBox = ({ name, message, onpress }) => {
  const displayMessage = message || "No Message Yet";

  return (
    <TouchableOpacity onPress={onpress}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {name.split(" ").reduce((prev, current) => `${prev}${current[0]}`, "")}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.messageText}>
            {displayMessage.length > 50
              ? displayMessage.slice(0, 46) + "..."
              : displayMessage}
          </Text>
        </View>
        <Seperator />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#99C4C8",
    height: 100,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginStart: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textContainer: {
    marginStart: 15,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  messageText: {
    fontSize: 12,
    color: "white",
  },
});

export default ChatsBox;
