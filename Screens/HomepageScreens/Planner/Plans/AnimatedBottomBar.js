import React from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-eva-icons";
import { useNavigation } from "@react-navigation/native";

console.disableYellowBox = true;

const width = Dimensions.get("window").width;
const AnimatedBottomBar = ({ translateY, dataArray }) => {
  const navigation = useNavigation();
  return (
    <Animated.View
      style={{
        ...styles.btmButtonHolder,
        transform: [{ translateY: translateY }],
      }}
    >
      <Icon
        name="plus-circle"
        width={70}
        height={70}
        fill={"#FB5581"}
        style={{ bottom: 10 }}
        onPress={() =>
          navigation.navigate("AddModule", {
            item: "AddPlan",
            modulesPlanned: dataArray,
          })
        }
      />
    </Animated.View>
  );
};

export default AnimatedBottomBar;

const styles = StyleSheet.create({
  btmButtonHolder: {
    position: "absolute",
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    left: 0.8 * width,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
