import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold } from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';
import { AuthContext } from "../navigation/AuthProvider";
import { Formik } from "formik";
import * as yup from 'yup';

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
    const [loading, setLoading] = useState(true)

    const [loaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
    });
      
    if (!loaded) {
        return null;
    }
    const { register } = useContext(AuthContext);
    return(
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.header}>Register</Text>
            <Formik
                    initialValues={{username: '', email: '', password: ''}}
                    validationSchema={registerSchema}
                    onSubmit={(values) => {
                        register(values.username, values.email, values.password);
                        console.log(values);
                    }}>
                {(props) => (
                    <View style={GlobalStyles.input_area}>
                        <View style={GlobalStyles.avatarWrap}>
                            <TouchableOpacity>
                                <Image style={GlobalStyles.profilePic} source={require('../assets/images/default-profile-icon.jpg')} />
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
                            <Text style={GlobalStyles.text}>Sign up</Text>
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