import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = React.useState([]);

  // Fetch posts from the API
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://gorest.co.in/public/v2/posts');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  // Render each post card
  const renderPostCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetails', { postId: item.id })}>
      <View style={styles.postCard}>
        <Text style={styles.userName}>User {item.user_id}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPostCard}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    postCard: {
      padding: 16,
      borderRadius: 10,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    userName: {
      marginLeft: 8,
      fontWeight: 'bold',
      color: '#333',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: '#222',
      marginBottom: 8,
    },
    content: {
      fontSize: 14,
      color: '#555',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default HomeScreen;