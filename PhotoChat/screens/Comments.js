import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity,
  ActivityIndicator,
  FlatList 
} from 'react-native'
import theme from '../core/theme'
import React,{ useState, useEffect } from 'react'
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from '../core/firebase';
import { ActionButtonItem } from 'react-native-action-button';
import { defaultProfilePic } from '../core/defaults';

const Comments = ({navigation, route}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = () => {
    setLoading(true);
    const postId = route.params.postId;
    const list = [];
    try{
      db.collection('comments')
      .where('postId', '==', postId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const {
            userId,
            postId,
            text,
            username,
            userImg,
          } = doc.data();
          list.push({
            id: doc.id,
            userId: userId,
            postId: postId,
            text: text,
            username: username,
            userImg: userImg,
          })
          setComments(list);
        })
      })
      .catch(function(err) {
        console.log('error: ', err);
    });
      // setComments(list);
    } catch(e){
      console.log(e);
    }
    setLoading(false);
  }

  const CommentsBox = ({ item }) => {
    const userId = item.userId;
    return(
    <View style={styles.comBubble}>
        {item.userImg ? <Image style={styles.comImage} source={{uri: item.userImg}} /> : 
          <Image style={styles.comImage} source={{uri: defaultProfilePic}} />
        }
        {/* <Image style={styles.comImage} source={{uri: avatar}}/> */}
        <Text style={styles.comText}>
            <Text style={{color: theme.SECONDARY_COLOR, fontWeight: 'bold',}}>
                {item.username}
            </Text> 
            {' '} {item.text} 
        </Text>
    </View>
    );
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color={theme.SECONDARY_COLOR} /> :
      <FlatList 
          data={comments}
          // onRefresh={onRefresh}
          // refreshing={isFetching} 
          renderItem = {({item}) => (
              <CommentsBox item={item} />
          )}
          keyExtractor={(item) => item.id}
          // ListHeaderComponent={ListHeader}
          // ListFooterComponent={ListHeader}
          showsVerticalScrollIndicator={false} 
      />
      }

      <View style={styles.commentWrap}>
        <TextInput
          style={styles.commentInput} 
          placeholder='Comment here '
          autoCapitalize={false}
        />
        <TouchableOpacity>
          <Icon name='send' size={25} color={theme.SECONDARY_COLOR} />
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default Comments

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  commentWrap: {
    backgroundColor: '#FFF',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    borderRadius: 5,
  },
  commentInput: {
    width: '93%',
    fontSize: 20,
    color: theme.SECONDARY_COLOR,
    height: 50,
  },
  comBubble: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 3,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
}, 
comText: {
    fontFamily: 'Nunito_400Regular',
    color: '#888888',
},
comImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 8,
},
})