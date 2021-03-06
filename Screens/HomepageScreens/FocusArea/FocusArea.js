import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import Header from "../../../Component/Header";
import { Icon } from "react-native-eva-icons";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import { globalFontStyles } from "../../../Component/GlobalFont";
import FirebaseDB from "../../../FirebaseDB";
import SuggestButton from "../../../Component/SuggestButton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const hairlineWidth = StyleSheet.hairlineWidth;

const FocusArea = ({ navigation }) => {
  const fb = FirebaseDB.firestore();
  const userID = FirebaseDB.auth().currentUser.uid;
  const focusAreaRef = fb.collection("focusArea").doc(userID);
  const takenModulesRef = fb.collection("takenModules").doc(userID);

  useEffect(() => {
    const unsub = focusAreaRef.onSnapshot(
      (document) => {
        setFocus(document.data().cat);
        takenModulesRef.onSnapshot((document) => {
          setTaken(document.data());
        });
      },
      (error) => null
    );
    return () => unsub();
  }, []);

  const [currentType, changeType] = useState("Prereq");
  const [menuVisible, setMenuVisible] = useState(false);
  const [takenModules, setTaken] = useState([]);
  const [focusArea, setFocus] = useState([]);

  const Edit = () => (
    <SuggestButton
      func={() => navigation.navigate("EditFocusArea", { type: focusArea })}
    />
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // prereq primaries electives
  const item1 = () =>
    currentType === "Prereq" || currentType === "Electives"
      ? "Primaries"
      : "Prereq";

  const item2 = () =>
    currentType === "Prereq" || currentType === "Primaries"
      ? "Electives"
      : "Prereq";

  const viewType = () => (
    <View style={styles.typeOverView}>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        activeOpacity={0.85}
        onPress={() => toggleMenu()}
      >
        <Text
          style={{
            ...globalFontStyles.OSSB_17,
            color: "#232323",
          }}
        >
          {currentType}
        </Text>
        <Icon
          fill="#232323"
          width={30}
          height={20}
          name="arrow-ios-downward-outline"
          style={{ marginTop: 4 }}
        />
      </TouchableOpacity>
    </View>
  );

  const selector = () => {
    const option = (item) => (
      <MenuItem
        title={
          <Text
            style={{
              ...globalFontStyles.OSR_15,
            }}
          >
            {item()}
          </Text>
        }
        onPress={() => {
          changeType(item());
          toggleMenu();
        }}
        activeOpacity={0.9}
      />
    );
    return (
      <OverflowMenu
        visible={menuVisible}
        anchor={viewType}
        onBackdropPress={() => toggleMenu()}
        style={styles.selector}
      >
        {option(item1)}
        {option(item2)}
      </OverflowMenu>
    );
  };

  const colors = [
    "#5EDCC2",
    "#4ABBEE",
    "#5E77DC",
    "#765EDC",
    "#BB5EDC",
    "#DC5E9D",
    "#A47777",
    "#E19797",
    "#20A87F",
    "#FF6F66",
  ];

  const lettersChecker = (val) => {
    return val !== "S" && val !== "CS" && val !== "CU";
  };

  const sort = (arr) => {
    return arr.sort((a, b) => {
      if (a.sem < b.sem) {
        return -1;
      } else if (a.sem === b.sem) {
        if (a.code < b.code) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    });
  };

  const GradeToPoint = (val) => {
    return val === "A+" || val === "A"
      ? 5.0
      : val === "A-"
      ? 4.5
      : val === "B+"
      ? 4.0
      : val === "B"
      ? 3.5
      : val === "B-"
      ? 3.0
      : val === "C+"
      ? 2.5
      : val === "C"
      ? 2.0
      : val === "D+"
      ? 1.5
      : val === "D"
      ? 1.0
      : 0;
  };

  const ColouredList = (props) => {
    const colors = props.colors;
    const array = props.array;

    const leftText1 = "Number of";
    const leftText2 = `${currentType.toLowerCase()} taken`;

    const content = (curr) => {
      const key = curr.key;
      const item = curr[currentType];
      const numTaken = item.numTaken === 0 ? "-" : item.numTaken;
      const numReq = item.numRequired !== undefined ? item.numRequired : 0;
      const CAP = () => {
        if (item.points === 0) {
          return "-";
        } else {
          const val = item.points / item.mcsUsedInCap;
          return val.toFixed(2);
        }
      };

      const circle = (
        <View
          style={{
            backgroundColor: colors[(key - 1) % 10],
            width: 0.03 * width,
            height: 0.03 * width,
            borderRadius: (0.03 * width) / 2,
          }}
        />
      );

      const text1 = () => {
        // See if all of them has number required
        if (numReq !== 0) {
          return numTaken + " / " + numReq;
        } else {
          return numTaken;
        }
      };

      const line1 = (text2) => (
        <View style={styles.innerText}>
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              top: 1,
              marginRight: 12,
            }}
          >
            {circle}
          </View>
          <View style={{ flex: 7, justifyContent: "center" }}>
            <Text
              style={{
                ...globalFontStyles.NBEB_13,
                color: "#686868",
              }}
            >
              {leftText1}
            </Text>
            <Text
              style={{
                ...globalFontStyles.NBEB_13,
                color: "#686868",
              }}
            >
              {leftText2}
            </Text>
          </View>
          <View
            style={{
              flex: 2.3,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...globalFontStyles.NBEB_13,
                color: "#686868",
              }}
            >
              {text2}
            </Text>
          </View>
        </View>
      );

      const line2 = (text1, text2) => (
        <View style={styles.innerText}>
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              top: 1,
              marginRight: 12,
            }}
          >
            {circle}
          </View>
          <View style={{ flex: 7, justifyContent: "center" }}>
            <Text
              style={{
                ...globalFontStyles.NBEB_13,
                color: "#686868",
              }}
            >
              {text1}
            </Text>
          </View>
          <View
            style={{
              flex: 2.3,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...globalFontStyles.NBEB_13,
                color: "#686868",
              }}
            >
              {text2}
            </Text>
          </View>
        </View>
      );

      return (
        <View style={styles.whitelayer}>
          {line1(text1())}
          {line2("CAP", CAP())}
        </View>
      );
    };

    const holders = (item) => {
      const current = item;
      const key = current.key;
      const name = current.name;

      const prereq = current["Prereq"].modules;
      const primaries = current["Primaries"].modules;
      const electives = current["Electives"].modules;

      const assignVal = (section, name) => {
        let taken = [];
        let notTaken = [];
        let numTaken = 0;
        let points = 0;
        let mcsUsedInCap = 0;
        for (let i = 0; i < section.length; i++) {
          if (takenModules[section[i].code] !== undefined) {
            const mod = takenModules[section[i].code];
            taken.push(mod);
            if (mod.grade !== "CU") {
              numTaken += 1;
            }
            if (lettersChecker(mod.grade)) {
              mcsUsedInCap += mod.numMcs;
              points += GradeToPoint(mod.grade) * mod.numMcs;
            }
          } else {
            notTaken.push(section[i]);
          }
        }
        current[name].taken = taken;
        current[name].notTaken = notTaken;
        current[name].mcsUsedInCap = mcsUsedInCap;
        current[name].points = points;
        current[name].numTaken = numTaken;
      };

      assignVal(prereq, "Prereq");
      assignVal(primaries, "Primaries");
      assignVal(electives, "Electives");

      return (
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.9}
          onPress={() => {
            current.Primaries.taken = sort(current.Primaries.taken);
            current.Electives.taken = sort(current.Electives.taken);

            const arr = [current.Primaries, current.Electives];
            navigation.navigate("EachFocusArea", {
              name:
                current.shortName === undefined
                  ? current.name
                  : current.shortName,
              arr: arr,
              taken: sort(current.Prereq.taken),
              notTaken: current.Prereq.notTaken,
              index: current.key - 1,
              from: "FocusArea",
            });
          }}
        >
          <View
            style={{
              ...styles.colorTop,
              backgroundColor: colors[(key - 1) % 10],
            }}
          >
            <View style={{ width: "90%" }}>
              <Text
                style={{
                  ...globalFontStyles.NBEB_15,
                  color: "#F4F4F4",
                  textAlign: "center",
                }}
              >
                {name}
              </Text>
            </View>
          </View>
          {content(current)}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, position: "relative" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={array}
          renderItem={({ item }) => holders(item)}
          keyExtractor={(item) => item.key.toString()}
          ListFooterComponent={<View style={{ height: height * 0.11 }}></View>}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header str={"Focus Area"} leftChildren={null} rightChildren={Edit()} />
      {focusArea.length > 0 ? selector() : null}
      <ColouredList colors={colors} array={focusArea} />
    </View>
  );
};

export default FocusArea;

const styles = StyleSheet.create({
  typeOverView: {
    width: width,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: hairlineWidth,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 16,
  },
  selector: {
    marginTop: (Platform.OS === "android" ? StatusBar.currentHeight : 0) - 4,
    width: 115,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
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
  // Suggest button
  buttonDesign: {
    height: 30,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    width: 160,
    top: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
