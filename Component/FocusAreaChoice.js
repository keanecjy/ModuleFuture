import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { globalFontStyles } from "./GlobalFont";
import { Icon } from "react-native-eva-icons";
// import FirebaseDB from "../FirebaseDB";

const FocusAreaChoice = (props) => {
  const [toggled, setToggle] = useState(false);

  // const userInfo = FirebaseDB.firestore().collection("users");
  // const user = FirebaseDB.auth().currentUser.uid;
  // const admin = require("firebase-admin").firestore.FieldValue;

  return (
    <TouchableOpacity
      style={styles.main}
      activeOpacity={0.65}
      onPress={() => {
        setToggle(!toggled);
        // userInfo
        //   .doc(user)
        //   .update({
        //     focusArea: toggled
        //       ? admin.arrayUnion(props.text)
        //       : admin.arrayRemove(props.text),
        //   })
        //   .catch((error) => alert(error));
      }}
    >
      <Text
        style={{
          ...globalFontStyles.OSSB_14,
          color: toggled ? "#232323" : "#00000080",
        }}
      >
        {props.text}
      </Text>
      <View>
        <Icon
          name={toggled ? "checkmark-square-2" : "square-outline"}
          width={25}
          height={25}
          fill={toggled ? "#232323" : "#00000080"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FocusAreaChoice;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 12,
  },
});
