import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Home';
import Profile from './Profile';
import Chat from './Chat';
import Other from './Other';
import LandingPage from './LandingPage';
import Onboarding from './Onboarding';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Navbar(){
    return(
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="paw" size={24} color="black" />
                    ),
                }}
            />
            
            <Tab.Screen 
                name="Chat" 
                component={Chat} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="wechat" size={24} color="black" />
                    ),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={24} color="black" />
                    ),
                }}
            />
           
        </Tab.Navigator>
    )
}
