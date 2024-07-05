import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Front from './Front';
import TabTwoScreen from './explore';
import { UserProvider } from '@/context/UserContext'
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
    return (
        <UserProvider>
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
        
                  if (route.name === 'Front') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                  }
        
                  // You can return any component that you like here!
                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
            
            >
                <Tab.Screen name="Front" component={Front} options={{ headerShown: false }} />
                <Tab.Screen name="Profile" component={TabTwoScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </UserProvider>
    );
}