import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './Components/TabNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </>
  );
}

