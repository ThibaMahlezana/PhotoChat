import react, {useState, useEffect} from "react";
import { View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    FlatList
} from 'react-native';
import theme from "../core/theme";
import { db } from '../core/firebase';
import PostCard from "./PostCard";

export default function Posts({ navigation }){
    const [posts, setPosts] = useState('');
    const [loading, setLoading] = useState(true);
    
    const fetchPosts = async () => {
        try{
            const list = [];
            await db.collection('posts')
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
            setPosts(list);

            if (loading) {
                setLoading(false);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const ListHeader = () => {
        return null;
    };    

    return(
        <View style={styles.container}>
            <FlatList 
                data={posts} 
                renderItem = {({item}) => (
                    <PostCard navigation={navigation} item={item} />
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={ListHeader}
                showsVerticalScrollIndicator={false} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: '#DBDBD9',
        height: '85%',
    },
});