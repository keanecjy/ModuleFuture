import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import Y1S1 from "./Plans/Y1S1";
import Y1S2 from "./Plans/Y1S2";
import Y2S1 from "./Plans/Y2S1";
import Y2S2 from "./Plans/Y2S2";
import Y3S1 from "./Plans/Y3S1";
import Y3S2 from "./Plans/Y3S2";
import Y4S1 from "./Plans/Y4S1";
import Y4S2 from "./Plans/Y4S2";
import Y5S1 from "./Plans/Y5S1";
import Y5S2 from "./Plans/Y5S2";
import Entypo from "react-native-vector-icons/Entypo";
import CardWallet from "../../../Component/CardWallet";
import { useNavigation } from "@react-navigation/native";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const ratio = 228 / 362;

const CARD_HEIGHT = width * 0.8 * ratio;
const ContentPage = (props) => {
  const navigation = useNavigation();
  const card1 = (
    <Image source={require("../../../assets/y1s1.png")} style={styles.card} />
  );
  const card2 = (
    <Image source={require("../../../assets/y1s2.png")} style={styles.card} />
  );
  const card3 = (
    <Image source={require("../../../assets/y2s1.png")} style={styles.card} />
  );
  const card4 = (
    <Image source={require("../../../assets/y2s2.png")} style={styles.card} />
  );
  const card5 = (
    <Image source={require("../../../assets/y3s1.png")} style={styles.card} />
  );
  const card6 = (
    <Image source={require("../../../assets/y3s2.png")} style={styles.card} />
  );
  const card7 = (
    <Image source={require("../../../assets/y4s1.png")} style={styles.card} />
  );
  const card8 = (
    <Image source={require("../../../assets/y4s2.png")} style={styles.card} />
  );
  const card9 = (
    <Image source={require("../../../assets/y5s1.png")} style={styles.card} />
  );
  const card10 = (
    <Image source={require("../../../assets/y5s2.png")} style={styles.card} />
  );
  const card11 = <View style={{ width: 0.8 * width, height: 200 }}></View>;

  const [menu, setMenu] = useState([
    {
      venue: <Y1S1 />,
      key: 1,
      name: "Year 1 - Sem 1",
      PageName: "Y1S1",
      card: card1,
    },
    {
      venue: <Y1S2 />,
      key: 2,
      name: "Year 1 - Sem 2",
      PageName: "Y1S2",
      card: card2,
    },
    {
      venue: <Y2S1 />,
      key: 3,
      name: "Year 2 - Sem 1",
      PageName: "Y2S1",
      card: card3,
    },
    {
      venue: <Y2S2 />,
      key: 4,
      name: "Year 2 - Sem 2",
      PageName: "Y2S2",
      card: card4,
    },
    {
      venue: <Y3S1 />,
      key: 5,
      name: "Year 3 - Sem 1",
      PageName: "Y3S1",
      card: card5,
    },
    {
      venue: <Y3S2 />,
      key: 6,
      name: "Year 3 - Sem 2",
      PageName: "Y3S2",
      card: card6,
    },
    {
      venue: <Y4S1 />,
      key: 7,
      name: "Year 4 - Sem 1",
      PageName: "Y4S1",
      card: card7,
    },
    {
      venue: <Y4S2 />,
      key: 8,
      name: "Year 4 - Sem 2",
      PageName: "Y4S2",
      card: card8,
    },
    {
      venue: <Y5S1 />,
      key: 9,
      name: "Year 5 - Sem 1",
      PageName: "Y5S1",
      card: card9,
    },
    {
      venue: <Y5S2 />,
      key: 10,
      name: "Year 5 - Sem 2",
      PageName: "Y5S2",
      card: card10,
    },
    { venue: {}, key: 11, name: "", PageName: "", card: card11 },
  ]);

  const y = new Animated.Value(0);
  const onScroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y } },
      },
    ],
    { useNativeDriver: true }
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.header}
          source={require("../../../assets/HeaderBG.jpg")}
        >
          <View
            style={{
              flex: 5,
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                ...globalFontStyles.OSB_34,
                color: "#FB5581",
                left: 30,
                bottom: 10,
              }}
            >
              Home
            </Text>
          </View>

          <View
            style={{
              flex: 2,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProgressPage");
              }}
              style={{ width: 50, height: 50 }}
            >
              <Entypo
                name="bar-graph"
                color="#979797"
                size={30}
                style={{ left: 15, top: 8 }}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={{ height: 5, width: "100%" }} />

      <View style={{ flex: 1 }}>
        <AnimatedFlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          data={menu}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) =>
            CardWallet(y, item.key.toString(), item.card, () =>
              item.key === 11 ? {} : navigation.navigate(item.PageName)
            )
          }
          {...{ onScroll }}
        />
      </View>
    </View>
  );
};

export default ContentPage;

const styles = StyleSheet.create({
  header: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,
    // elevation: 2,
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
  card: {
    width: width * 0.8,
    height: CARD_HEIGHT,
  },
});
