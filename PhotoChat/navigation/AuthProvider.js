import { Alert, View, Text } from 'react-native'
import React, {createContext, useState} from 'react'
import { auth, db } from '../core/firebase';

export const AuthContext = createContext();

const AlertMessage = (message) => {
  Alert.alert('Sign in Error', 
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
  );
}; 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                      await auth.signInWithEmailAndPassword(email, password);
                    } catch (error) {
                      if(error.code == 'auth/wrong-password'){
                        let message = 'Password is wrong';
                        AlertMessage(message);
                      }
                      if(error.code == 'auth/user-not-found'){
                        let message = 'User with this email does not exist';
                        AlertMessage(message);
                      }
                      console.log(error);
                    }
                },
                register: async (avatar, username, email, password) => {
                    try {
                      await auth.createUserWithEmailAndPassword(email, password)
                      .then(() => {
                        db.collection('users').doc(auth.currentUser.uid)
                        .set({
                            username: username,
                            email: email,
                            createdAt: '',
                            bio: '',
                            location: '',
                            phone: '',
                            userImg: avatar,
                        })
                        .catch(error => {
                            if(error.code == 'auth/email-already-exists'){
                              let message = 'User with this email already exist';
                              AlertMessage(message);
                            }
                            console.log('Something went wrong with added user to firestore: ', error);
                        })
                      })
                      .catch(error => {
                          if(error.code == 'auth/email-already-in-use'){
                            let message = 'User with this email already exist';
                            AlertMessage(message);
                          }
                          console.log('Something went wrong with sign up: ', error);
                      });
                    } catch (e) {
                      console.log(e);
                    }
                },
                logout: async () => {
                    try {
                      await auth.signOut();
                    } catch (e) {
                      console.log(e);
                    }
                },
            }}>
                {children}
        </AuthContext.Provider>
    )
}