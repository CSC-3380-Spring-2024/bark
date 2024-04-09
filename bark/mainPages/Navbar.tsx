import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Home'
import Profile from './Profile'
import Chat from './Chat'
import Other from './Other'
import LandingPage from './LandingPage'
import Onboarding from './Onboarding'


const Tab = createBottomTabNavigator();

//initialRouteName="LandingPage"
//<Tab.Screen name = "LandingPage" component={LandingPage} options={{}}/>
export default function Navbar(){
    return(
        <Tab.Navigator>
            
            <Tab.Screen name = "Home" component={Home} />
            <Tab.Screen name = "Other" component = {Other} />
            <Tab.Screen name = "Chat" component={Chat} />
            <Tab.Screen name = "Profile" component={Profile} />
            <Tab.Screen name = "Onboarding" component = {Onboarding} />
        </Tab.Navigator>
    )
}