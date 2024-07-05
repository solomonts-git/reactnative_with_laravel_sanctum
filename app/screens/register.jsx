import React, { useState } from 'react';
import { TextInput, Button, Alert,View, SafeAreaView, ActivityIndicator, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from '@/services/api';
import {setToken} from '@/services/tokenService';

import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors,setErrors]=useState({});

  const navigation = useNavigation();

  const register = (data) => axios.post('/register', data);

  const handleRegister = async () => {

    if(email=='' || password ==''||name==''||passwordConfirmation==''){
      Alert.alert('Required Fields','All Fields Required');
    }

    try {
      setLoading(true);
      const response = await register({
        name: name,
        email: email.toLowerCase(),
        password: password,
        password_confirmation: passwordConfirmation,
      });
      setLoading(false);
      // Alert.alert('Success', 'User registered successfully');
      //console.log(response.data);
      await setToken(response?.data?.token);
      navigation.navigate('Front');
    } catch (error) {
      console.log("Response error", error.response);
    //  Alert.alert('Error', error.response?.data?.message || 'An error occurred');
      console.error(error.response?.data);
      setErrors(error.response?.data?.errors)
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex:1, padding: 20, backgroundColor: "aqua" }}>
        <LinearGradient
        // Background Linear Gradient
        colors={['#50d5b7', '#067d68','transparent']}
        style={styles.background}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{marginTop:50,textAlign:'center',fontSize:20,fontWeight:'bold',color:'white'}}>User Registration</Text>
          <TextInput placeholder="Full Name"  placeholderTextColor="white" value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5,marginTop:10,color:'white' }} />
          {errors && <Text style={{color:'red',fontSize:10}}>{errors.name}</Text>}
          <TextInput placeholder="Email"  placeholderTextColor="white" value={email} onChangeText={setEmail} keyboardType="email-address" style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5,color:'white' }}/>
          {errors && <Text style={{color:'red',fontSize:10}}>{errors.email}</Text>}
          <TextInput placeholder="Password"  placeholderTextColor="white" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5,color:'white' }}/>
          {errors && <Text style={{color:'red',fontSize:10}}>{errors.password}</Text>}
          <TextInput
            placeholder="Confirm Password"
             placeholderTextColor="white"
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            secureTextEntry
            style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 }}
          />
          <TouchableOpacity disabled={loading} onPress={handleRegister} style={{marginVertical:10,borderRadius:10,paddingVertical:10,backgroundColor:'#007bff' }}>
              <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Register</Text>
            </TouchableOpacity>
          {loading ? <ActivityIndicator size="large" /> :<Text></Text>}
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