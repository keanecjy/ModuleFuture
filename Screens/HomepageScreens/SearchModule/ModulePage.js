import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import ModuleBlocks from "../AddModule/ModuleBlocks";
import Entypo from "react-native-vector-icons/Entypo";
import { Icon } from "react-native-eva-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ModulePage = (props) => {
  const current = React.createRef();

  const header = (
    <View style={styles.header}>
      <View style={{ padding: width * 0.05 }}>
        <Text
          style={{ ...globalFontStyles.OSB_15, top: 22, alignSelf: "center" }}
        >
          Module Search
        </Text>
        <View style={styles.second}>
          <View style={styles.item2}>
            <Icon
              style={{ marginLeft: 10, marginRight: 12 }}
              fill="#76768080"
              width={20}
              height={20}
              name="search-outline"
            />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Module code, name"
                  placeholderTextColor="#76768080"
                  autoCapitalize="words"
                  onChangeText={(text) => {
                    let newList = Array.from(fullList).filter(
                      (item) =>
                        item.lowerCasedName.indexOf(text.toLowerCase()) !== -1
                    );
                    setModuleList(newList);
                  }}
                  ref={current}
                ></TextInput>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Icon
            style={{ marginLeft: 10 }}
            fill="#3FE2D3"
            width={28}
            height={28}
            name="options-2-outline"
            onPress={() => {
              props.navigation.navigate("Filter", {
                fullList: Array.from(fullList),
                currentFilters: filterArr,
                origList: Array.from(origList),
                loc: "Module",
              });
              current.current.clear();
            }}
          />
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    if (props.route.params?.locationFrom === "Filter") {
      const newList = props.route.params?.afterFilter;
      setFullList(new Set(newList));
      setModuleList(newList);
      setFilterArr(props.route.params?.currentFilters);
    }
  }, [props.route.params?.newModules || props.route.params?.currentFilters]);

  const [filterArr, setFilterArr] = useState([]);
  const [origList, setOrigList] = useState(new Set(props.moduleList));
  const [fullList, setFullList] = useState(new Set(props.moduleList));
  const [moduleList, setModuleList] = useState(props.moduleList);

  const crossIcon = (
    <Entypo size={20} name="cross" style={{ color: "#FF6C7D", top: 2 }} />
  );
  const tickIcon = (
    <Entypo size={20} name="check" style={{ color: "#4AE8AB", top: 1 }} />
  );

  const setSem = (array) => {
    if (array) {
      const arrOfBoolean = [false, false, false, false];
      for (let i = 0; i < array.length; i++) {
        arrOfBoolean[array[i] - 1] = true;
      }
      return arrOfBoolean;
    }
  };

  const holders = (item) => {
    const mc = item.MC;
    const suOptions = item.suOption;
    let description = item.description;
    if (description) {
      description = description.replace(/(\r\n|\n|\r)/gm, "");
    }
    const semData = setSem(item.Semester);
    const workLoad = item.workLoad;

    let totalWork = 0;
    if (workLoad) {
      for (let i = 0; i < workLoad.length; i++) {
        totalWork += workLoad[i];
      }
    }

    return (
      <View style={{ ...styles.container }}>
        <View
          style={{
            width: "78%",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...globalFontStyles.OSSB_14,
              color: "#232323",
              marginBottom: 15,
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              marginBottom: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 15,
              }}
            >
              <Text style={{ ...styles.suTextStyle, marginRight: 2 }}>
                SU availability
              </Text>
              {suOptions ? tickIcon : crossIcon}
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: "black",
                marginRight: 15,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                ...globalFontStyles.OSSB_14,
                color: "#2A4F74",
              }}
            >{`MCs : ${mc}`}</Text>
          </View>
          <Text
            numberOfLines={4}
            style={{
              color: "#3B6EA2",
              ...globalFontStyles.OSSB_13,
              marginBottom: 20,
            }}
          >
            {description}
          </Text>
          {workLoad ? workloaddisplays(workLoad) : null}
        </View>
        <View style={{ width: "22%", alignItems: "flex-end" }}>
          {sidetab("Sem 1", semData[0])}
          {sidetab("Sem 2", semData[1])}
          {sidetab("ST I", semData[2])}
          {sidetab("ST II", semData[3])}
        </View>
      </View>
    );
  };

  const sidetab = (sem, bool) => (
    <View
      style={{
        ...styles.sideTab,
        backgroundColor: bool ? "#FF6B6B" : "#927575",
      }}
    >
      <Text style={{ ...globalFontStyles.OSSB_13, color: "white" }}>{sem}</Text>
    </View>
  );

  const workloaddisplays = (array) => {
    let sum = 0;
    const colorArray = ["#F49097", "#DFB2F4", "#5467CE", "#5491CE", "#55D6C2"];
    const titleArray = ["Lec", "Tut", "Lab", "Proj", "Prep"];
    const arrayToMake = [];
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
      for (let j = 0; j < array[i]; j++) {
        if (j === 0) {
          arrayToMake.push({
            color: colorArray[i],
            title: titleArray[i],
          });
        } else {
          arrayToMake.push({
            color: colorArray[i],
            title: "",
          });
        }
      }
    }
    if (array) {
      return (
        <View>
          <Text
            style={{
              ...globalFontStyles.OSSB_13,
              color: "#232323",
              marginBottom: 12,
            }}
          >
            {`Workload: ${sum} hrs`}
          </Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {arrayToMake.map(({ color, title }, index) => (
              <ModuleBlocks color={color} key={index} title={title} sum={sum} />
            ))}
          </View>
        </View>
      );
    }
  };

  return (
    <View style={{ alignItems: "center", backgroundColor: "#F4F4F4", flex: 1 }}>
      {header}
      <View style={{ marginBottom: 0.25 * height }}>
        <FlatList
          keyboardShouldPersistTaps="always"
          ListHeaderComponent={<View style={{ marginVertical: 5 }} />}
          data={moduleList}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => holders(item)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: height * 0.06 - 20 }} />}
        />
      </View>
    </View>
  );
};

export default ModulePage;

const styles = StyleSheet.create({
  // Stylesheet for header
  header: {
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    width: width,
    height: 0.178 * height,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignContent: "flex-start",
    justifyContent: "center",
  },
  item2: {
    flexDirection: "row",
    backgroundColor: "#7676801F",
    height: "100%",
    width: "88%",
    alignItems: "center",
  },
  second: {
    top: height * 0.04 + 5,
    height: "50%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: height * 0.2,
    width: width * 0.9,
    borderRadius: 25,
  },
  twoCenter: { flex: 2, alignItems: "center", justifyContent: "center" },
  headerStyling: {
    ...globalFontStyles.OSB_17,
    alignSelf: "center",
    color: "#1F3C58",
  },
  suTextStyle: {
    ...globalFontStyles.OSSB_14,
    color: "#2A4F74",
  },
  lineDesign: {
    height: 1,
    width: "90%",
    backgroundColor: "#D0CECE",
    alignSelf: "center",
    bottom: 10,
  },
  oneCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow10: {
    flexDirection: "row",
    bottom: 10,
  },
  headerPreStyling: {
    ...globalFontStyles.OSB_15,
    color: "#2A4F74",
    alignSelf: "center",
    textDecorationLine: "underline",
  },
  mdStyle: {
    alignSelf: "center",
    ...globalFontStyles.OSB_17,
    color: "#2A4F74",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "lightgrey",
    borderWidth: StyleSheet.hairlineWidth * 2,

    width: width * 0.94,
    height: 275,
    paddingLeft: 10,
    paddingTop: 20,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sideTab: {
    width: 55,
    height: 30,
    marginBottom: 0.5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
