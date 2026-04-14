import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DashboardKinerjaCabangScreen} from '../screens/DashboardKinerjaCabang';

export type RootStackParamList = {
  DashboardKinerjaCabang: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DashboardKinerjaCabang"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="DashboardKinerjaCabang"
          component={DashboardKinerjaCabangScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
