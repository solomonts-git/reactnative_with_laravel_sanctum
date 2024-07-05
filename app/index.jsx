import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/login';
import Home from './screens/Home';
import Register from './screens/register';
import TabsLayout from './tabs/_layout';
import { getToken } from '@/services/tokenService';
import { useNavigation, useRouter } from 'expo-router';

const Stack = createStackNavigator();

export default function Index() {
    const [token, setToken] = useState('');
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchToken = async () => {
            const res = await getToken();
            setToken(res);
        };

        fetchToken();
      //  console.log(token)
    }, []);


    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                {!token ? 
                <>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                </>
                    :
                    <Stack.Screen name="TabsLayout" component={TabsLayout} options={{ headerShown: false }} />
                }
            </Stack.Navigator>
        </NavigationContainer>

    )
}
