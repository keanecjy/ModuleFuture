import React, { useState } from "react";
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
import { CommonActions, BaseRouter } from "@react-navigation/native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import { Icon } from "react-native-eva-icons";
import BottomBar from "../../../Component/BottomBar";
import Modal from "react-native-modal";
import Cross from "../../../Component/Cross";
import Container from "../../../Component/Container";
import moduleList from "../../../Data/ModuleList";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const AddModule = ({ navigation }) => {
  const header = (
    <View style={styles.header}>
      <View style={{ padding: width * 0.05 }}>
        <Cross
          top={12}
          left={0}
          transition={() => navigation.goBack()}
          text={"Add a module"}
        />
        <View style={styles.second}>
          <View style={styles.item2}>
            <Icon
              style={{ marginLeft: 10 }}
              fill="#76768080"
              width={20}
              height={20}
              name="search-outline"
            />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Module code, name"
                  style={{ ...globalFontStyles.OSSB_15, marginLeft: 10 }}
                  placeholderTextColor="#76768080"
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
            onPress={() => navigation.navigate("Filter")}
          />
        </View>
      </View>
    </View>
  );

  const [MCcount, addVal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setItem] = useState(moduleList[0]);
  const [split, setSplit] = useState(0);
  const [modules, add] = useState(new Set());

  const compute = (taken, notTaken) => {
    const len = taken.length + notTaken.length;
    return (taken.length / len) * 100;
  };

  const holders = (item) => (
    <Container
      name={item.name}
      prereq={item.prereqFulfilled}
      button1Press={() => {
        setItem(item);
        setSplit(compute(item.taken, item.notTaken));
        setModalVisible(true);
      }}
      button2Press={() => null}
      incr={() => {
        addVal(MCcount + 1);
        const newSet = modules.add(item.name.substring(0, 7));
        add(newSet);
        newSet.forEach((x) => console.log(x));
      }}
      decr={() => {
        addVal(MCcount - 1);
        modules.delete(item.name.substring(0, 7));
        let newSet = modules;
        add(newSet);
      }}
    />
  );

  const textWithIcon = (name) => (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 6,
      }}
    >
      <View
        style={{
          backgroundColor: "black",
          width: 0.02 * width,
          height: 0.02 * width,
          borderRadius: (0.02 * width) / 2,
          marginRight: 7,
        }}
      />
      <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
        <Text
          numberOfLines={1}
          style={{ ...globalFontStyles.OSR_13, color: "#0E2131" }}
        >
          {name}
        </Text>
      </View>
    </View>
  );

  const modal = (portion1, portion2) => {
    return (
      <Modal
        style={styles.modalBox}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropTransitionOutTiming={0}
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            height: `${portion1}%`,
            top: 15,
            width: "100%",
            paddingBottom: 10,
          }}
        >
          <Text style={{ ...globalFontStyles.OSSB_14 }}>
            {portion1 > 0 ? "Taken" : ""}
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={current.taken}
            keyExtractor={(item) => item.key.toString()}
            renderItem={({ item }) => textWithIcon(item.name)}
          />
        </View>
        <View style={{ height: `${portion2}%`, width: "100%", paddingTop: 20 }}>
          <Text style={{ ...globalFontStyles.OSSB_14 }}>
            {portion2 > 0 ? "Not Taken" : ""}
          </Text>
          <FlatList
            data={current.notTaken}
            keyExtractor={(item) => item.key.toString()}
            renderItem={({ item }) => textWithIcon(item.name)}
          />
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ alignItems: "center", backgroundColor: "#F4F4F4", flex: 1 }}>
      {header}
      <View style={{ marginBottom: 200 }}>
        <FlatList
          ListHeaderComponent={<View style={{ marginVertical: 5 }} />}
          data={moduleList}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) => holders(item)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: height * 0.06 - 20 }} />}
        />
      </View>
      {modal(split, 100 - split)}
      <BottomBar
        leftText={`Modules added: ${MCcount}`}
        transition={() => {
          navigation.setParams({ mods: modules });
          navigation.goBack();
        }}
        rightText={"Add modules"}
        size={"33%"}
      />
    </View>
  );
};

export default AddModule;

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
    top: height * 0.04,
    height: "50%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: height * 0.35,
    width: width * 0.8,
    paddingLeft: 25,
    borderRadius: 25,
  },
});
