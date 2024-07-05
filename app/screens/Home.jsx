import { View, Text, Pressable, StyleSheet, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
    const router = useRouter();

    return (

        <SafeAreaView style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#50d5b7', '#067d68', 'transparent']}
                style={styles.background}
            />
            {/* <Image style={{width:'100%',height:'50%'}} source={{uri:'https://i.etsystatic.com/35966576/r/il/589dce/5118639787/il_fullxfull.5118639787_g98p.jpg'}} /> */}
            <View style={styles.logo}>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'white', fontWeight: 600 }}>Laravel API SANCTUM</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, fontStyle: 'italic', color: 'white' }}>Vs</Text>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'white', fontWeight: 600 }}>React Native</Text>
            </View>
            <View style={styles.card}>
                <Pressable style={styles.button} onPress={() => router.push("/screens/register")}>
                    <Text style={styles.buttontxt}>Register</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => router.push("/screens/login")}>
                    <Text style={styles.buttontxt}>Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "aqua",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 10
    },
    logo: {
        width: '100%',
        height: '25%',
        marginTop: 50,

        marginHorizontal: 15,
    },
    card: {
        width: '100%',
        height: '50%',
        marginVertical: 10,
        marginHorizontal: 15,
    },
    button: {
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 10,

    },
    buttontxt: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
});
