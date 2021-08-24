import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Details from '../screens/Details';

const Stack = createNativeStackNavigator();

const headerStyles = {
  headerStyle: {
    backgroundColor: '#3f51b5',
  },
  headerTintColor: '#fff',
};

const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={headerStyles}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigator;
