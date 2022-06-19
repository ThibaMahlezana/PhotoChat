import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  FlatList 
} from 'react-native'
import theme from '../core/theme'
import React,{ useState, useEffect } from 'react'
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from '../core/firebase';
import { ActionButtonItem } from 'react-native-action-button';

const Comments = ({navigation, route}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = () => {
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
          } = doc.data();
          list.push({
            id: doc.id,
            userId: userId,
            postId: postId,
            text: text,
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
  }

  const CommentsBox = ({ item }) => (
    <View style={styles.comBubble}>
        <Image style={styles.comImage} source={require('../assets/images/pp1.jpg')}/>
        <Text style={styles.comText}>
            <Text style={{color: theme.SECONDARY_COLOR, fontWeight: 'bold',}}>
                John Doe 
            </Text> 
            {' '} {item.text} 
        </Text>
    </View>
  );

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <View style={styles.container}>
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

      <View style={styles.commentWrap}>
        <TextInput
          style={styles.commentInput} 
          placeholder='Comment here '
          autoFocus={true}
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
    marginTop: 5,
    marginBottom: 5,
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