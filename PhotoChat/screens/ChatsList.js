import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import theme from '../core/theme'
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';
import { db } from '../core/firebase';
import { AuthContext } from '../navigation/AuthProvider';
import moment from "moment";
import Header from '../components/Header';
import ChatMessageCard from '../components/ChatMessageCard';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/images/500.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/images/500.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/images/500.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/images/500.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/images/500.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const ChatsList = ({ route, navigation }) => {
  const {user, logout} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState([]);

  const fetchChatList = async () => {
    const list = [];
    try{
      await db.collection('chats')
      .where('clientId', '==', user.uid)
      .get()
      .then((querySnapshot) => {
        // console.log('num messages ',querySnapshot.size);
        querySnapshot.forEach((doc) => {
          const { text, time, userId } = doc.data();
          list.push({
            id: doc.data.id,
            text: text,
            time: time,
            userId: userId,
          });
          setMessages(list);
        })
      })
    } catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    fetchChatList();
  }, [])

  return (
    <><Header route={route} navigation={navigation} />
    <View style={styles.container}>
      <FlatList 
        data={messages}
        keyExtractor={item=>item.id}
        renderItem={({item}) => (
          <ChatMessageCard item={item} />
        )} />
    </View>
    </>
  )
}

export default ChatsList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
})