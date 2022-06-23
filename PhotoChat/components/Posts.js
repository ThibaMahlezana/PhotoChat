import react, {useState, useEffect} from "react";
import { View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    ActivityIndicator,
    FlatList
} from 'react-native';
import theme from "../core/theme";
import { db } from '../core/firebase';
import PostCard from "./PostCard";

export default function Posts({ navigation }){
    const [posts, setPosts] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    
    const fetchPosts = async () => {
        setLoading(true);
        try{
            const list = [];
            await db.collection('posts')
            .orderBy('postTime', 'desc')
            .get()
            .then((QuerySnapshot) => {
                QuerySnapshot.forEach((doc) => {
                    const {
                        userId,
                        post,
                        postImg,
                        postTime,
                        likes,
                        comments,
                    } = doc.data();
                    list.push({
                        id: doc.id,
                        userId,
                        userName: 'Test Name',
                        userImg:
                            'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                        postTime: postTime,
                        post,
                        postImg,
                        liked: false,
                        likes,
                        comments,
                    });
                });
            })
            .catch(function(err) {
                console.log('error: ', err);
            });
            setPosts(list);

            if (loading) {
                setLoading(false);
            }
        }
        catch(e){
            console.log(e);
        }
        setLoading(false);
    }

    const onRefresh = async () => {
        setIsFetching(true);
        fetchPosts();
        setIsFetching(false);
    };

    useEffect(() => {
        fetchPosts();
    },[])

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //       fetchPosts();
    //     });
    //     return unsubscribe;
    // }, [navigation]);

    const ListHeader = () => {
        return null;
    };    

    return(
        <View style={styles.container}>
            { loading ?
            <ActivityIndicator size="large" color={theme.SECONDARY_COLOR} />
            :
            <FlatList 
                data={posts}
                onRefresh={onRefresh}
                refreshing={isFetching} 
                renderItem = {({item}) => (
                    <PostCard navigation={navigation} item={item} />
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={ListHeader}
                showsVerticalScrollIndicator={false} 
            />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#DBDBD9',
        height: '78%',
    },
});