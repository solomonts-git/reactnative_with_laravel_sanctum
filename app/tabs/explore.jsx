import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { deleteToken, getToken } from '@/services/tokenService';

export default function TabTwoScreen() {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const handleLogout = async () => {
    try {
      const token = await getToken();
      console.log("token---", token);

      if (token) {
        const response = await axios.post(
          "http://192.168.56.1:8000/api/logout",
          {},
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        await deleteToken();
        console.log("Logout Response", response.data);
        router.push("/screens/Home");
      }
    } catch (error) {
      console.error('Failed to logout:', error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userinfo}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userinfo: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
  },
  email: {
    fontSize: 18,
  },
  logoutButton: {
    padding: 20,
    marginTop: 15,
    backgroundColor: 'lightblue',
    color: 'white',
    borderRadius: 15,
    width: '25%',
    alignItems: 'center',
  },
});
