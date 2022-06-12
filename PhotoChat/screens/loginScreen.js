import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator } from 'react-native';
import { GlobalStyles, Nunito_400Regular, Nunito_700Bold} from "../styles/GlobalStyles";
import { useFonts } from 'expo-font';
import { AuthContext } from "../navigation/AuthProvider";
import { Formik } from "formik";
import * as yup from 'yup';
import Loader from "../core/loader";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})


export default function Login({ navigation }){
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)

  const [loaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
    });
      
    if (!loaded) {
        return null;
    }

    return(
      <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.header}>sign in</Text>
          <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                setLoading(true);
                login(values.email, values.password);
              }}>
            {(props) => (
              <View style={GlobalStyles.input_area}>
                <TextInput 
                  value={props.values.email}
                  onChangeText={props.handleChange('email')}
                  style={GlobalStyles.input} 
                  placeholder="Email"
                  onBlur={props.handleBlur('email')}
                  autoCapitalize='none'
                  autoCorrect={false}
                  autoFocus={true}
                  keyboardType="email-address"
                />
                {(props.errors.email && props.touched.email) &&
                  <Text style={GlobalStyles.errorText}>{props.errors.email}</Text>
                }
                <TextInput 
                  value={props.values.password}
                  onChangeText={props.handleChange('password')}
                  style={GlobalStyles.input} 
                  placeholder="Password" 
                  onBlur={props.handleBlur('password')}
                  secureTextEntry
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
                      <Text style={GlobalStyles.text}>Sign in</Text>
                      }
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('RegisterWith')}>
                  <Text style={GlobalStyles.description}>Don't have an account? <Text style={{fontWeight: 'bold'}}>sign up.</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('RestorePassword')}>
                  <Text style={GlobalStyles.description}>forgot password? <Text style={{fontWeight: 'bold'}}>restore password.</Text></Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
      </View>
    );
}

const styles = StyleSheet.create({});