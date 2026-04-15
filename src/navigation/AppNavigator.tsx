import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DashboardKinerjaCabangScreen} from '../screens/DashboardKinerjaCabang';
import {LoginScreen} from '../screens/Login';

export type RootStackParamList = {
  Login: undefined;
  DashboardKinerjaCabang: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animationEnabled: true}}>
        {isLoggedIn ? (
          <Stack.Screen
            name="DashboardKinerjaCabang"
            component={DashboardKinerjaCabangScreen}
          />
        ) : (
          <Stack.Screen name="Login">
            {() => <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
