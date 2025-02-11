import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

const PostDetailsScreen = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState([]);

  // Fetch post details and comments
  React.useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postResponse = await axios.get(`https://gorest.co.in/public/v2/posts/${postId}`);
        setPost(postResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(`https://gorest.co.in/public/v2/comments?post_id=${postId}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostDetails();
    fetchComments();
  }, [postId]);

  // Render each comment card
  const renderCommentCard = ({ item }) => (
    <View style={styles.commentCard}>
      <Text style={styles.commentUserName}>{item.name}</Text>
      <Text style={styles.commentContent}>{item.body}</Text>
    </View>
  );

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.postContainer}>
        <Text style={styles.userName}>User {post.user_id}</Text>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.body}</Text>
      </View>
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>Comments:</Text>
        <FlatList
          data={comments}
          renderItem={renderCommentCard}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    postContainer: {
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
    commentsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222',
      marginBottom: 8,
    },
    commentCard: {
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    commentUserName: {
      marginLeft: 8,
      fontWeight: 'bold',
      color: '#333',
    },
    commentContent: {
      marginTop: 4,
      fontSize: 14,
      color: '#555',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default PostDetailsScreen;