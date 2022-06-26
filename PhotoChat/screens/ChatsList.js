import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  TextInput, 
  ActivityIndicator
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import theme from '../core/theme'
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';
import { db } from '../core/firebase';
import { AuthContext } from '../navigation/AuthProvider';
import moment from "moment";
import Header from '../components/Header';
import ChatMessageCard from '../components/ChatMessageCard';
import OnlineUsers from '../components/OnlineUsers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
  const [loading, setLoading] = useState(false);

  const fetchChatList = async () => {
    const list = [];
    try{
      await db.collection('chats')
      .where('clientId', '==', user.uid)
      .get()
      .then((querySnapshot) => {
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
    {loading ? <ActivityIndicator size="large" color={theme.SECONDARY_COLOR} /> : 
      <View style={styles.container}>
        <View style={styles.textInputWrap}>
          <FontAwesome name='search' size={25} color={theme.SECONDARY_COLOR} />
          <TextInput style={styles.searchText} placeholder='Search...' />
        </View>
        <OnlineUsers />
        <FlatList 
          data={messages}
          keyExtractor={(item) => {return item.id}}
          renderItem={({item}) => (
            <ChatMessageCard item={item} navigation={navigation} />
          )} />
      </View>
      }
    </>
  )
}

export default ChatsList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#ffffff',
  },
  textInputWrap: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.SECONDARY_COLOR,
    fontFamily: 'Nunito_400Regular',
  }
})