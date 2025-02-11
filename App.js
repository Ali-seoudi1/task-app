// App.tsx or App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PostDetailsScreen from './screens/PostDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#000', // Dark blue color
          },
          headerTintColor: '#fff', // White text color
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="PostDetails" component={PostDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#000', // Dark blue color
          },
          headerTintColor: '#fff', // White text color
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}