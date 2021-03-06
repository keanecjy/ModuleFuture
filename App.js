import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Homepage from "./Screens/Homepage";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import FirebaseDB from "./FirebaseDB";
import ModuleListWithKey from "./Data/ModuleListMoreInfo";

// -------------------------------------- SCREEN IMPORTS --------------------------------------------------------
import ProTip from "./Screens/HomepageScreens/Profile/ProTip/ProTip";
import PlannerLesson from "./Screens/HomepageScreens/Profile/ProTip/PlannerLesson";
import WhatIfLesson from "./Screens/HomepageScreens/Profile/ProTip/WhatIfLesson";
import ProgressLesson from "./Screens/HomepageScreens/Profile/ProTip/ProgressLesson";
import RecordsLesson from "./Screens/HomepageScreens/Profile/ProTip/RecordsLesson";
import FocusAreaLesson from "./Screens/HomepageScreens/Profile/ProTip/FocusAreaLesson";
import TnC from "./TnC";
import Login from "./Screens/Login/Login";
import ForgetPW from "./Screens/Login/ForgetPW";
import DetailsCollection from "./Screens/Login/DetailsCollection";
import ProgressPageSettings from "./Screens/HomepageScreens/Planner/ProgressPageSettings";
import AddModule from "./Screens/HomepageScreens/AddModule/AddModule";
import Filter from "./Screens/HomepageScreens/AddModule/Filter";
import SeeModules from "./Screens/HomepageScreens/AddModule/SeeModules";
import ModuleItself from "./Screens/HomepageScreens/SearchModule/ModuleItself";
import {
  Y1S1,
  Y1S2,
  Y2S1,
  Y2S2,
  Y3S1,
  Y3S2,
  Y4S1,
  Y4S2,
  Y5S1,
  Y5S2,
} from "./Screens/HomepageScreens/Planner/Plans/ContentPlan";
import AddPlan from "./Screens/HomepageScreens/Planner/Plans/AddPlan";
import ViewPlan from "./Screens/HomepageScreens/Planner/Plans/ViewPlan";
import ChoosingOptions from "./Component/MakingClock";
import Graduation from "./Screens/HomepageScreens/Profile/Graduation";
import EmailVerification from "./Screens/HomepageScreens/Profile/EmailVerification";
import Credit from "./Screens/HomepageScreens/Profile/Credit";
import TypePage from "./Screens/HomepageScreens/Records/TypePage";
import CodeOrLevel from "./Screens/HomepageScreens/Records/CodeOrLevel";
import EditRecords from "./Screens/HomepageScreens/Records/EditRecords";
import EditFocusArea from "./Screens/HomepageScreens/FocusArea/EditFocusArea";
import EachFocusArea from "./Screens/HomepageScreens/FocusArea/EachFocusArea";

// -------------------------------------------------------------------------------------------------------------

const AuthStack = createStackNavigator();
console.disableYellowBox = true;
const getFonts = () => {
  return Font.loadAsync({
    "OpenSans-Italic": require("./assets/Font/OpenSans-Italic.ttf"),
    "OpenSans-Regular": require("./assets/Font/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("./assets/Font/OpenSans-SemiBold.ttf"),
    "OpenSans-Bold": require("./assets/Font/OpenSans-Bold.ttf"),
    "OpenSans-ExtraBold": require("./assets/Font/OpenSans-ExtraBold.ttf"),
    "Nunito-Regular": require("./assets/Font/Nunito-Regular.ttf"),
    "Nunito-Italic": require("./assets/Font/Nunito-Italic.ttf"),
    "Nunito-SemiBold": require("./assets/Font/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("./assets/Font/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("./assets/Font/Nunito-ExtraBold.ttf"),
  });
};

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState({
    loading: false,
    user: null,
  });

  const loadAssetAsync = async () => {
    const imageAssets = cacheImages([
      require("./assets/loginbackgroundtest2.png"),
      require("./assets/loginbackgroundtest4.png"),
      require("./assets/y1s1.png"),
      require("./assets/y1s2.png"),
      require("./assets/y2s1.png"),
      require("./assets/y2s2.png"),
      require("./assets/y3s1.png"),
      require("./assets/y3s2.png"),
      require("./assets/y4s1.png"),
      require("./assets/y4s2.png"),
      require("./assets/y5s1.png"),
      require("./assets/y5s2.png"),
      require("./assets/HeaderBG.png"),
      require("./assets/plan1.png"),
      require("./assets/plan2.png"),
      require("./assets/plan3.png"),
      require("./assets/plan4.png"),
      require("./assets/bargraph.png"),
      require("./assets/woodBG.png"),
      require("./assets/ModuleFutureLogo1.png"),
      // loading of the displays of the Tutorial pics
      require("./assets/TutorialPic1.png"),
      require("./assets/TutorialPic2.png"),
      require("./assets/TutorialPic3.png"),
      require("./assets/TutorialPic4.png"),
      require("./assets/TutorialPic5.png"),
      // loading of Planner Tutorial Pictures
      require("./assets/PlannerPage1.png"),
      require("./assets/PlannerPage2.png"),
      require("./assets/PlannerPage3.png"),
      require("./assets/PlannerPage4.png"),
      require("./assets/PlannerPage5.png"),
      require("./assets/PlannerPage6.png"),
      require("./assets/PlannerPage7.png"),
      require("./assets/PlannerPage8.png"),
      require("./assets/PlannerPage9.png"),
      // loading of WhatIfLesson pictures
      require("./assets/WhatIfLesson1.png"),
      require("./assets/WhatIfLesson2.png"),
      require("./assets/WhatIfLesson3.png"),
      require("./assets/WhatIfLesson4.png"),
      require("./assets/WhatIfLesson5.png"),
      // loading of Progress pictures
      require("./assets/ProgressLesson1.png"),
      require("./assets/ProgressLesson2.png"),
      require("./assets/ProgressLesson3.png"),
      // loading of RecordsLesson pictures
      require("./assets/RecordsLesson1.png"),
      require("./assets/RecordsLesson2.png"),
      require("./assets/RecordsLesson3.png"),
      require("./assets/RecordsLesson4.png"),
      require("./assets/RecordsLesson5.png"),
      // loading of FocusLesson pictures
      require("./assets/FocusLesson1.png"),
      require("./assets/FocusLesson2.png"),
      require("./assets/FocusLesson3.png"),
      require("./assets/FocusLesson4.png"),
      require("./assets/FocusLesson5.png"),
    ]);

    const fontAssets = getFonts();
    await Promise.all([fontAssets, ...imageAssets]);
  };
  useEffect(() => {
    const fb = FirebaseDB.firestore();
    const usersRef = fb.collection("users");

    FirebaseDB.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setData({
              user: userData,
              loading: true,
            });
          })
          .catch((error) => {});
      } else {
        setData({ loading: true });
      }
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isReady ? (
        !data.loading ? (
          <></>
        ) : (
          <SafeAreaProvider>
            <ApplicationProvider {...eva} theme={eva.light}>
              <NavigationContainer theme={{ colors: { background: "white" } }}>
                <AuthStack.Navigator
                  headerMode="false"
                  screenOptions={{
                    cardStyleInterpolator:
                      CardStyleInterpolators.forHorizontalIOS,
                    ...TransitionPresets.SlideFromRightIOS,
                    transitionSpec: {
                      open: config,
                      close: config,
                    },
                  }}
                >
                  {data.user ? (
                    <>
                      <AuthStack.Screen name="Homepage">
                        {(props) => (
                          <Homepage
                            {...props}
                            extraData={data.user}
                            moduleList={ModuleListWithKey()}
                          />
                        )}
                      </AuthStack.Screen>
                      <AuthStack.Screen
                        name="ProgressPageSettings"
                        component={ProgressPageSettings}
                      />
                      <AuthStack.Screen name="Y1S1" component={Y1S1} />
                      <AuthStack.Screen name="Y1S2" component={Y1S2} />
                      <AuthStack.Screen name="Y2S1" component={Y2S1} />
                      <AuthStack.Screen name="Y2S2" component={Y2S2} />
                      <AuthStack.Screen name="Y3S1" component={Y3S1} />
                      <AuthStack.Screen name="Y3S2" component={Y3S2} />
                      <AuthStack.Screen name="Y4S1" component={Y4S1} />
                      <AuthStack.Screen name="Y4S2" component={Y4S2} />
                      <AuthStack.Screen name="Y5S1" component={Y5S1} />
                      <AuthStack.Screen name="Y5S2" component={Y5S2} />
                      <AuthStack.Screen name="AddPlan" component={AddPlan} />
                      <AuthStack.Screen
                        name="EditRecords"
                        component={EditRecords}
                      />
                      <AuthStack.Screen
                        name="ModuleItself"
                        component={ModuleItself}
                      />
                      <AuthStack.Screen name="AddModule">
                        {(props) => (
                          <AddModule
                            {...props}
                            moduleList={ModuleListWithKey()}
                          />
                        )}
                      </AuthStack.Screen>
                      <AuthStack.Screen
                        name="SeeModules"
                        component={SeeModules}
                      />
                      <AuthStack.Screen name="ViewPlan" component={ViewPlan} />
                      <AuthStack.Screen
                        name="EditFocusArea"
                        component={EditFocusArea}
                      />
                      <AuthStack.Screen
                        name="EachFocusArea"
                        component={EachFocusArea}
                      />
                      <AuthStack.Screen name="TypePage" component={TypePage} />
                      <AuthStack.Screen
                        name="CodeOrLevel"
                        component={CodeOrLevel}
                      />
                      <AuthStack.Screen name="Filter" component={Filter} />
                      <AuthStack.Screen
                        name="Graduation"
                        component={Graduation}
                      />
                      <AuthStack.Screen
                        name="EmailVerification"
                        component={EmailVerification}
                      />
                      <AuthStack.Screen name="Credit" component={Credit} />
                      <AuthStack.Screen name="TnC" component={TnC} />
                      <AuthStack.Screen name="ProTip" component={ProTip} />
                      <AuthStack.Screen
                        name="PlannerLessonStack"
                        component={PlannerLesson}
                      />
                      <AuthStack.Screen
                        name="WhatIfStack"
                        component={WhatIfLesson}
                      />
                      <AuthStack.Screen
                        name="ProgressLessonStack"
                        component={ProgressLesson}
                      />
                      <AuthStack.Screen
                        name="RecordsLessonStack"
                        component={RecordsLesson}
                      />
                      <AuthStack.Screen
                        name="FocusAreaLessonStack"
                        component={FocusAreaLesson}
                      />
                    </>
                  ) : (
                    <>
                      <AuthStack.Screen name="Login" component={Login} />
                      <AuthStack.Screen
                        name="ForgetPassword"
                        component={ForgetPW}
                      />
                      <AuthStack.Screen
                        name="DetailsCollection"
                        component={DetailsCollection}
                      />
                      <AuthStack.Screen
                        name="ChoosingOptions"
                        component={ChoosingOptions}
                      />
                      <AuthStack.Screen name="TnC" component={TnC} />
                    </>
                  )}
                </AuthStack.Navigator>
              </NavigationContainer>
            </ApplicationProvider>
          </SafeAreaProvider>
        )
      ) : (
        <AppLoading
          startAsync={loadAssetAsync}
          onFinish={() => setIsReady(true)}
          onError={console.warn}
        />
      )}
    </View>
  );
}
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    useNativeDriver: true,
  },
};
