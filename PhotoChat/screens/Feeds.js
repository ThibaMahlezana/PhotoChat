import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import Stories from './Stories';
import Posts from '../components/Posts';
import Header from '../components/Header';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { fetchPosts } from '../redux/actions/postActions';

function Feeds({ route, navigation }){
    const posts = useState([]);

    console.log(fetchPosts());

    return(
        <View style={styles.container}>
            <Header route={route} navigation={navigation} />
            <Stories navigation={navigation} />
            <Posts navigation={navigation} />
        </View>
    );
}

const mapStateToProps = state => ({
    posts: state.post
  });
  
  export default connect(
    mapStateToProps,
    { fetchPosts }
  )(Feeds);

const styles = StyleSheet.create({
    container: {
    },
});