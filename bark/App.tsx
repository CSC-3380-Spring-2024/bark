import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import Navbar from './mainPages/Navbar'
import LandingPage from './mainPages/LandingPage';




export default function App() {
  const [loggedIn, setLoginStatus] = useState<boolean>(false);


  return (
    <>
    {loggedIn ? 
    <NavigationContainer>
      <Navbar />
    </NavigationContainer>
    :<LandingPage setLoginStatus = {setLoginStatus}/>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
