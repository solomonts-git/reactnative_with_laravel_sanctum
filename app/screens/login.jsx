import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';
import axios from '@/services/api';
import { setToken } from '@/services/tokenService';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
  const router = useRouter();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginToken, setLoginToken] = useState(null);
  const [errors, setErrors] = useState({});

  const login = (data) => axios.post('/login', data);;

  const handleLogin = async () => {
    // Implement your login logic here (e.g., authentication)
    // If successful, navigate to tabs
   
    if(email=='' || password ==''){
      Alert.alert('Required Fields','All Fields Required');
    }

    try {
      setLoading(true);
      
      const response = await login({
        email: email.toLowerCase(),
        password: password
      });

      setLoading(false);
      // Alert.alert('Success', 'User registered successfully');
      //console.log(response.data);
      await setToken(response?.data?.token);
      setLoginToken(response?.data?.token)
      router.push("/tabs");
    } catch (error) {
      setLoading(true);
      // console.log("Response error", error.response);
      //  Alert.alert('Error', error.response?.data?.message || 'An error occurred');
      console.error(error.response?.data);
      setErrors(error.response?.data?.errors)
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1,justifyContent: 'center', alignItems: 'center', backgroundColor: "aqua", }}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#50d5b7', '#067d68', 'transparent']}
        style={styles.background}
      />
      <ScrollView style={{ flex: 1, width: '100%' }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, width: '100%', marginTop: 100 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center',color:'white' }}>User Login</Text>
          <View style={{ width: '100%', padding: 20 }}>
            <Text style={{ marginBottom: 5, fontSize: 20,color:'white' }}>Email</Text>
            <TextInput onChangeText={(v) => setEmail(v)} style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 ,color:'white'}} />
            {errors && <Text style={{ color: 'red', fontSize: 12 }}>{errors.email}</Text>}
            <Text style={{ marginBottom: 5, fontSize: 20,color:'white' }}>Password</Text>
            <TextInput onChangeText={(v) => setPassword(v)} style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5,color:'white' }} secureTextEntry />
            {errors && <Text style={{ color: 'red', fontSize: 12 }}>{errors.password}</Text>}
            <TouchableOpacity
              onPress={() => handleLogin()}
              style={{ backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center' }}
            >
              <Text style={{ fontSize:20,color: 'white', fontWeight: 'bold' }}>Login</Text>
            </TouchableOpacity>
          </View>
          {loading ? <ActivityIndicator size="large" /> : <Text></Text>}
        </View>
        {errors && <Text style={{ color: 'red', fontSize: 12 }}>{errors.message}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },

})