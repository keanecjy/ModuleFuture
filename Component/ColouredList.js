import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ColouredList = (props) => {
  const colors = props.colors;
  const bool = props.text3 === "4.1";
  const mcsOrNum = props.mcsOrNum;

  const content = (key, noTaken, mcsTaken, noRequired, mcsTotal, CAP) => {
    const circle = (
      <View
        style={{
          backgroundColor: colors[(key - 1) % 8],
          width: 0.03 * width,
          height: 0.03 * width,
          borderRadius: (0.03 * width) / 2,
        }}
      />
    );

    const text = (input) => (
      <Text
        numberOfLines={2}
        style={{
          ...(bool ? globalFontStyles.NBEB_13 : globalFontStyles.NBEB_14),
          color: "#686868",
        }}
      >
        {input}
      </Text>
    );

    const text1 = () => {
      if (mcsOrNum === "MCs taken") {
        if (mcsTotal === 0) {
          return "-";
        } else {
          return (mcsTaken === 0 ? "-" : mcsTaken) + " / " + mcsTotal;
        }
      } else {
        if (noRequired === 0) {
          return "-";
        } else {
          return (noTaken === 0 ? "-" : noTaken) + " / " + noRequired;
        }
      }
    };

    const line = (text1, text2) => (
      <View style={styles.innerText}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            top: 1,
          }}
        >
          {circle}
        </View>
        <View style={{ flex: 4, justifyContent: "center" }}>{text(text1)}</View>
        <View
          style={{
            flex: bool ? 1.3 : 2.5,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {text(text2)}
        </View>
      </View>
    );

    return (
      <View style={styles.whitelayer}>
        {line(mcsOrNum, text1())}
        {line("CAP", CAP)}
      </View>
    );
  };

  const holders = (item) => {
    const key = item.key;
    const name = item.name;
    const noTaken = item.noTaken;
    const mcsTaken = item.mcsTaken;
    const mcsTotal = item.mcsTotal;
    let noRequired = 0;
    const CAP = item.CAP === 0 ? "-" : item.CAP;
    if (mcsTotal !== 0) {
      noRequired = item.noRequired;
    }

    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => {
          props.transition();
        }}
      >
        <View
          style={{ ...styles.colorTop, backgroundColor: colors[(key - 1) % 8] }}
        >
          <View style={{ width: "90%" }}>
            <Text
              style={{
                ...(bool ? globalFontStyles.NBEB_15 : globalFontStyles.NBEB_17),
                color: "#F4F4F4",
                textAlign: "center",
              }}
            >
              {name}
            </Text>
          </View>
        </View>
        {content(key, noTaken, mcsTaken, noRequired, mcsTotal, CAP)}
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: (width - 40) / 2,
      height: height / 5,
      marginVertical: 12,
      marginHorizontal: 10,
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      flexDirection: "column",
      backgroundColor: "white",
    },
    colorTop: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "32%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    innerText: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
    },
    whitelayer: {
      height: "68%",
      width: "100%",
      paddingHorizontal: width * 0.02,
    },
  });

  const array = props.array;

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={array}
        renderItem={({ item }) => holders(item)}
        keyExtractor={(item) => item.key.toString()}
        ListFooterComponent={<View style={{ height: 70 }} />}
      />
    </View>
  );
};

export default ColouredList;