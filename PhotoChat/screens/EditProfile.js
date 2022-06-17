import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Alert,
  Pressable,
  Modal,
  Platform, 
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  Image } 
from 'react-native'
import React, {useEffect, useContext, useState, useRef} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../core/theme';
import { AuthContext } from '../navigation/AuthProvider';
import { db, store } from '../core/firebase';
import {defaultProfilePic} from '../core/defaults';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)

  const getUser = async() => {
    const currentUser = await db
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        // console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleUpdate = async() => {
    setLoading(true);
    const imageUrl = await uploadImage();

    db.collection('users')
    .doc(user.uid)
    .update({
      username: userData.username,
      bio: userData.bio,
      phone: userData.phone,
      location: userData.location,
      userImg: imageUrl,
    })
    .then(() => {
      console.log('User Updated!');
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.'
      );
    })
    setLoading(false);
  }

  const uploadImage = async () => {
    if( image == null ) {
        console.log('no image');
        return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    // Implement a new Blob promise with XMLHTTPRequest
    var blob = await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uploadUri, true);
        xhr.send(null);
    });

    // Create a ref in Firebase
    const ref = store.ref(`photos/${filename}`);

    // Upload blob to Firebase
    const snapshot = await ref.put(blob, { contentType: "image/png" });

    // Create a download URL
    const remoteURL = await snapshot.ref.getDownloadURL();

    // Return the URL
    return remoteURL;
};

  useEffect(() => {
    getUser();
  }, []);

  return (
    <KeyboardAvoidingView
      //behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
        <ScrollView>

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
                <Text style={styles.modalText}>Upload Image</Text>
                <Pressable
                  style={styles.button}
                  onPress={pickImage}
                >
                  <Icon name="md-images-outline" style={styles.Icon} size={20} />
                  <Text style={styles.textStyle}>Choose from gallary</Text>
                </Pressable>
                <Pressable
                  style={styles.button}
                  //onPress={() => setModalVisible(!modalVisible)}
                >
                  <Icon name="camera-outline" style={styles.Icon}size={20} />
                  <Text style={styles.textStyle}>Take Photo</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Icon name="md-close" style={styles.Icon} size={20} />
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <TouchableOpacity 
            style={styles.header}
            onPress={() => setModalVisible(true)}
            >
              {image ? <Image source={{ uri: image }} style={styles.image} /> : 
                      <Image 
                        style={styles.image} 
                        source={{uri: userData==null ? userData && userData.userImg : defaultProfilePic}}
                      />
              }
          </TouchableOpacity>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={theme.SECONDARY_COLOR} size={20} />
            <TextInput
                placeholder="Username"
                placeholderTextColor="#666666"
                style={[GlobalStyles.input, {width: '90%', marginLeft: 12}]}
                autoCorrect={false}
                value={userData && userData.username}
                onChangeText={(txt) => setUserData({...userData, username: txt})}
            />
          </View>
          <View style={styles.action}>
            <Ionicons name="ios-clipboard-outline" color={theme.SECONDARY_COLOR} size={20} />
            <TextInput 
                multiline
                numberOfLines={3}
                placeholder="About Me"
                placeholderTextColor="#666666"
                style={[GlobalStyles.input, {width: '90%', marginLeft: 12}]}
                autoCorrect={false}
                value={userData && userData.bio}
                onChangeText={(txt) => setUserData({...userData, bio: txt})}
            />
          </View>
          <View style={styles.action}>
            <Feather name="phone" color={theme.SECONDARY_COLOR} size={20} />
            <TextInput 
                placeholder="Phone"
                placeholderTextColor="#666666"
                style={[GlobalStyles.input, {width: '90%', marginLeft: 12}]}
                autoCorrect={false}
                value={userData && userData.phone}
                onChangeText={(txt) => setUserData({...userData, phone: txt})}
            />
          </View>
          <View style={styles.action}>
            <MaterialCommunityIcons
                name="map-marker-outline"
                color={theme.SECONDARY_COLOR}
                size={25}
            />
            <TextInput 
                placeholder="Location"
                placeholderTextColor="#666666"
                style={[GlobalStyles.input, {width: '90%', marginLeft: 12}]}
                autoCorrect={false}
                value={userData && userData.location}
                onChangeText={(txt) => setUserData({...userData, location: txt})}
            />
          </View>
          <TouchableOpacity style={GlobalStyles.button} onPress={handleUpdate}>
            {loading ? <ActivityIndicator size="large" color='#FFF' /> :
              <Text style={GlobalStyles.text}>Update</Text>
            }
          </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
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