import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../components/Main';
import Home from '../components/Home';
const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Main} />
                <Stack.Screen name="Unlock" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
