import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import React, {useState} from 'react'
import { db } from '../core/firebase'

const ImagesList = ({userId}) => {
  const [posts, setPosts] = useState([]);

  const fetchUserPosts = () => {
    try{
      const list = [];
      if(userId == null){
        return;
      }
      db.collection('posts')
      .where('userId', '==', userId)
      .get()
      .then((querySnapshot) => {
        // console.log('Total Posts: ', querySnapshot.size);
        querySnapshot.forEach((doc) => {
          const { postImg, postTime } = doc.data();
          //console.log(doc.data());
          list.push({
            id: doc.data.id,
            postTime: postTime,
            postImg: postImg
          });
          // console.log(list);
          setPosts(list);
        });
      })
      
    } catch(e){
      console.log(e);
    }
  };

  return (
      <FlatList
        style={styles.constainer} 
        data={posts}
        renderItem={({item}) => (
          <Text>One</Text>
        )}
      />
  )
}

export default ImagesList

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    padding: 20,
  }
})