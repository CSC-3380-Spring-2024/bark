import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Profile from "./Profile";
import Chat from "./Chat";
import Other from "./Other";
import LandingPage from "./LandingPage";
import Onboarding from "./Onboarding";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { push, ref, get } from "@firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
var darkerBrown = "#C4A484";
var lighterBrown = "#EADDCA";

export default function Navbar() {
  const [onBoard, getOnboarded] = useState<boolean>(true);
  const userRef = ref(
    FIREBASE_DATABASE,
    `users/${FIREBASE_AUTH.currentUser?.uid}/`
  );

  //PULL USER DATA FROM DATABASE
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        getOnboarded(snapshot.val().onBoarded);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return !onBoard ? (
    <Onboarding
      editingProf={() => {}}
      signingUp={getOnboarded}
      editProf={false}
      nameProp={""}
      dogNameProp={""}
      bioProp={""}
    />
  ) : (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: darkerBrown,
        tabBarInactiveBackgroundColor: darkerBrown,
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: darkerBrown },
        tabBarItemStyle: {
          borderWidth: 1,
          borderColor: lighterBrown,
          borderBottomColor: darkerBrown,
          borderBlockEndColor: darkerBrown,
          borderBottomWidth: 40,
          //   borderEndColor: lighterBrown,
          height: 100,
          //   borderStartColor: lighterBrown,
        },
        tabBarStyle: {
          paddingBottom: 0,
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name=" Bark "
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="paw"
              size={24}
              color={focused ? "white" : "black"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Bark"
        component={Chat}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="wechat"
              size={24}
              color={focused ? "white" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="  Bark  "
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "white" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
