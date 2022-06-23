import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';
import { AuthContext } from "../navigation/AuthProvider";
import { Formik } from "formik";
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { store, db } from '../core/firebase';

const registerSchema = yup.object({
    username: yup
        .string()
        .min(3, ({ min }) => `Password must be at least ${min} characters`)
        .required("Username is require"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })

export default function Register({ navigation }){
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const [loaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
    });
      
    if (!loaded) {
        return null;
    }
    const { register } = useContext(AuthContext);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [2, 2],
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
        const ref = store.ref(`avatars/${filename}`);

        // Upload blob to Firebase
        const snapshot = await ref.put(blob, { contentType: "image/png" });

        // Create a download URL
        const remoteURL = await snapshot.ref.getDownloadURL();

        // Return the URL
        return remoteURL;
    };
    

    return(
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.header}>Register</Text>
            <Formik
                    initialValues={{username: '', email: '', password: ''}}
                    validationSchema={registerSchema}
                    onSubmit={async (values) => {
                        setLoading(true);
                        const avatar = await uploadImage();
                        register(avatar, values.username, values.email, values.password);
                        //console.log(values);
                    }}>
                {(props) => (
                    <View style={GlobalStyles.input_area}>
                        <View style={GlobalStyles.avatarWrap}>
                            <TouchableOpacity onPress={pickImage}>
                            {image ? <Image style={GlobalStyles.profilePic} source={{ uri: image }} />
                                : <Image style={GlobalStyles.profilePic} source={require('../assets/images/default-profile-icon.jpg')} />
                            }
                            </TouchableOpacity>
                            <Text style={GlobalStyles.avatarText}>Upload Avatar</Text>
                        </View>
                        <TextInput 
                            style={GlobalStyles.input} 
                            placeholder="username"
                            value={props.values.username}
                            onChangeText={props.handleChange('username')}
                            onBlur={props.handleBlur('username')}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {(props.errors.username && props.touched.username) &&
                        <Text style={GlobalStyles.errorText}>{props.errors.username}</Text>
                        }
                        <TextInput 
                            style={GlobalStyles.input} 
                            placeholder="Email"
                            value={props.values.email}
                            onChangeText={props.handleChange('email')}
                            onBlur={props.handleBlur('email')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                        />
                        {(props.errors.email && props.touched.email) &&
                        <Text style={GlobalStyles.errorText}>{props.errors.email}</Text>
                        }
                        <TextInput 
                            style={GlobalStyles.input} 
                            placeholder="Password" 
                            secureTextEntry
                            value={props.values.password}
                            onChangeText={props.handleChange('password')}
                            onBlur={props.handleBlur('password')}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {(props.errors.password && props.touched.password) &&
                        <Text style={GlobalStyles.errorText}>{props.errors.password}</Text>
                        }
                        <TouchableOpacity 
                            style={GlobalStyles.button} 
                            onPress={props.handleSubmit}>
                                {loading ? <ActivityIndicator size="large" color='#FFF' /> : 
                                <Text style={GlobalStyles.text}>Sign up</Text>
                                }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                            <Text style={GlobalStyles.description}>Already have an accout? <Text style={{fontWeight: 'bold'}}>sign in.</Text></Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({});