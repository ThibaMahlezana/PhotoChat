import React, { useState, useEffect, useContext } from 'react';
import {View, 
    Text, 
    StyleSheet, 
    Image, 
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../core/theme';
import { AuthContext } from '../navigation/AuthProvider';
import { store, db } from '../core/firebase';

export default function AddPost(){
    const {user, logout} = useContext(AuthContext);
    
    const [image, setImage] = useState(null);
    const [post, setPost] = useState(null);
    const [uploading, setUploading] = useState(false);

    const submitPost = async () => {
        const imageUrl = await uploadImage();
        console.log('Image Url: ', imageUrl);
        console.log('Post: ', post);

        db.collection('posts')
        .add({
            userId: user.uid,
            post: post,
            postImg: imageUrl,
            postTime: null,
            likes: null,
            comments: null,
        })
        .then(() => {
            Alert.alert('Post', 'Post has been added!');
            console.log('Post Added');
            setPost(null);
            setImage(null);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };

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
    
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image ? <Image source={{ uri: image }} style={{ width: 350, height: 250 }} />
                    :<Icon name="md-images-outline" style={styles.placImg} />}
            {uploading}
            <TextInput 
                style={styles.caption} 
                placeholder='Whats on your mind?'
                multiline={true}
                numberOfLines={4}
                value={post}
                onChangeText={(content) => setPost(content)}
            />
            <TouchableOpacity style={styles.btn} onPress={submitPost}>
                <Text style={styles.text}>Post</Text>
            </TouchableOpacity>
            <ActionButton buttonColor={theme.SECONDARY_COLOR}>
                <ActionButton.Item
                    buttonColor="#9b59b6"
                    title="Take Photo"
                    //onPress={takePhotoFromCamera}
                >
                    <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor="#3498db"
                    title="Choose Photo"
                    onPress={pickImage}
                >
                    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    placImg: {
        fontSize: 80,
        color: theme.LIGHTGREY,
    },
    caption: {
        fontSize: 15,
        color: theme.SECONDARY_COLOR,
        backgroundColor:theme.LIGHTGREY,
        marginVertical: 20,
        height: 80,
        width: '90%',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    btn: {
        backgroundColor: theme.SECONDARY_COLOR,
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        textTransform: 'uppercase'
    }
});