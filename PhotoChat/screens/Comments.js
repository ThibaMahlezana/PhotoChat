import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Pressable,
  Modal,
  FlatList 
} from 'react-native'
import theme from '../core/theme'
import React,{ useState, useEffect, useContext } from 'react'
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from '../core/firebase';
import { ActionButtonItem } from 'react-native-action-button';
import { defaultProfilePic } from '../core/defaults';
import { AuthContext } from '../navigation/AuthProvider';
import firebase from 'firebase/compat';

const Comments = ({navigation, route}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user, logout} = useContext(AuthContext);
  const [comment, setComment] = useState(null);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [curentUser, setCurrentUser] = useState(false);

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

  const getUser = async () => {
    await db.collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
            setUserData(documentSnapshot.data());
        }
    })
    .catch(function(err) {
        console.log('error: ', err);
    });
  }

  const renderModal = () => {
    return(
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure you want to delete this comment ?</Text>
                <Pressable
                  style={styles.button}
                  onPress={(item) => {
                    deleteComment(item);
                  }}
                >
                  <Icon name="checkmark" style={styles.Icon} size={20} />
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Icon name="md-close" style={styles.Icon} size={20} />
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>
              </View>
            </View>
      </Modal>
    );
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
        { (userId == user.uid) ?
          <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(true)}>
            <Icon name='close' size={20}  color={theme.SECONDARY_COLOR} />
          </TouchableOpacity> : null
        }
    </View>
    );
  };

  const handleComment = () => {
    setLoading(true);
    if(comment == null){
      Alert.alert('Comment Error!', 'Please write a comment');
      setLoading(false);
    }
    else{
      db.collection('comments')
        .add({
            userId: user.uid,
            postId: route.params.postId,
            userImg: userData.userImg ? userData.userImg : '',
            username: userData.username,
            text: comment,
            time: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          fetchComments();
          setComment('');
        })
    }
    setLoading(false);
  }

  const deleteComment = (item) => {
    console.log('comment deleted')
    console.log(item.text)
    setModalVisible(false);
  }

  useEffect(() => {
    fetchComments();
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {renderModal()}
      {loading ? <ActivityIndicator size="large" color={theme.SECONDARY_COLOR} /> :
      <FlatList 
          data={comments}
          renderItem = {({item}) => (
              <CommentsBox item={item} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false} 
      />
      }

      <View style={styles.commentWrap}>
        <TextInput
          style={styles.commentInput} 
          placeholder='Comment here '
          autoCapitalize={false}
          onChangeText={(text) => setComment(text)}
          value={comment}
        />
        <TouchableOpacity onPress={handleComment}>
          {loading ? <ActivityIndicator size="large" color={theme.SECONDARY_COLOR} /> :
              <Icon name='send' size={25} color={theme.SECONDARY_COLOR} />
          }
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
    marginHorizontal: 5,
    width: '100%',
  },
  commentInput: {
    width: '93%',
    fontSize: 15,
    color: theme.SECONDARY_COLOR,
    height: 50,
  },
  comBubble: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 3,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  }, 
  comText: {
      fontFamily: 'Nunito_400Regular',
      color: '#888888',
      width: '75%',
  },
  comImage: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginRight: 8,
  },
  closeBtn: {
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.SECONDARY_COLOR,
  },
  Icon: {
    marginRight: 10,
    color: '#FFF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: 'Nunito_400Regular',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    color: theme.SECONDARY_COLOR,
  }
})