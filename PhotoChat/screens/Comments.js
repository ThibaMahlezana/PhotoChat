import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import theme from '../core/theme'
import React,{ useState, useEffect } from 'react'
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from '../core/firebase';

const Comments = ({navigation, route}) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try{
      await db.collection('posts')
      .doc(route.params.postId)
      .collection('comments')
      .get()
      .then((QuerySnapshot) => {
        console.log(QuerySnapshot.size);
      })
    } catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.comBubble}>
          <Image style={styles.comImage} source={require('../assets/images/pp1.jpg')}/>
          <Text style={styles.comText}>
              <Text style={{color: theme.SECONDARY_COLOR, fontWeight: 'bold',}}>
                  John Doe 
              </Text> 
              {' '} Deeply in thought about all life. 
          </Text>
      </View>
      <View style={styles.comBubble}>
          <Image style={styles.comImage} source={require('../assets/images/pp1.jpg')}/>
          <Text style={styles.comText}>
              <Text style={{color: theme.SECONDARY_COLOR, fontWeight: 'bold',}}>
                  John Doe 
              </Text> 
              {' '} Deeply in thought about all life. 
          </Text>
      </View>
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
    fontFamily: 'Nunito_700Bold',
    color: '#888888',
},
comImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 8,
},
})