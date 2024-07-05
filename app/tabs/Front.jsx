import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { getToken } from '@/services/tokenService';
import PostList from '@/components/PostList';

export default function Front() {
  const [data, setData] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getToken();
        setToken(res);
       // console.log("token", res);
 
        if (res) {
          const response = await axios.get("http://192.168.56.1:8000/api/posts", {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${res}`
            }
          });
         // console.log("Response", response.data);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>   
      <Text style={{fontWeight:'bold',fontSize:15}}>Posts</Text>   
      <PostList posts={data.posts} style={{marginTop:5,flex:1}}/>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "aqua",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical:10
  }
});
