import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Input,
  Spinner,
  Text,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useColor} from '../Context/ColorContext';
import Comment from './Comment';
import Modal from './Modal';
import UserRating from './UserRating';
import {useSelector} from 'react-redux';
import {selectAuth} from '../features/authSlice';
import firestore from '@react-native-firebase/firestore';

export default function ItemDiscussion({route}) {
  const {
    state: {theme},
  } = useColor();
  const {item} = route.params;
  const [reviews, setReviews] = useState([]);
  const postsPerLoad = 5;
  const [startAfter, setStartAfter] = useState({});
  const [lastPost, setLastPost] = useState(false);

  const fetchPosts = async postsPerLoad => {
    const posts = [];
    const snapshot = await firestore()
      .collection('Reviews')
      .where('item_id', '==', item.id)
      .orderBy('created_at', 'asc')
      .limit(postsPerLoad)
      .get();

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    snapshot.forEach(doc => {
      let data = doc.data();
      data.id = doc.id;
      posts.push(data);
    });
    return {posts, lastVisible};
  };

  const getMoreReviews = async (postsPerLoad, startAfter) => {
    const posts = [];
    const snapshot = await firestore()
      .collection('Reviews')
      .where('item_id', '==', item.id)
      .orderBy('created_at', 'asc')
      .startAfter(startAfter)
      .limit(postsPerLoad)
      .get();

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    snapshot.forEach(doc => {
      let data = doc.data();
      data.id = doc.id;
      posts.push(data);
    });
    return {posts, lastVisible};
  };

  const updateReviews = async () => {
    if (!lastPost) {
      const {posts, lastVisible} = await getMoreReviews(
        postsPerLoad,
        startAfter,
      );
      setReviews([...reviews, ...posts]);
      setStartAfter(lastVisible);
      posts.length === 0 ? setLastPost(true) : setLastPost(false);
    }
  };

  useEffect(() => {
    let isSubscribed;
    async function fetchData() {
      isSubscribed = true;
      const {posts, lastVisible} = await fetchPosts(postsPerLoad);
      setReviews([...reviews, ...posts]);
      setStartAfter(lastVisible);
    }
    fetchData(), [];
    () => {
      isSubscribed = false;
    };
  }, []);

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('Reviews')
  //     .doc(item.id)
  //     .orderBy('reviews')
  //     .onSnapshot(documentSnapshot => {
  //       console.log(documentSnapshot.data);
  //     });
  //   return subscriber;
  // }, []);

  const {name, user_id} = useSelector(selectAuth);

  function addData() {
    firestore().collection('Reviews').add({
      item_id: item.id,
      user_id: user_id,
      user_name: name,
      message: 'The anime was really good. I loved it',
      rating: 4,
      created_at: firestore.Timestamp.now(),
    });
  }

  // console.log(reviews);

  const calculateAvgRatings = () => {
    if (reviews.length === 0) return 0;
    return (
      reviews.reduce((acc, curr) => {
        return acc + curr.rating;
      }, 0) / reviews.length
    );
  };
  const avgRatings = calculateAvgRatings();
  return (
    <Box>
      <Box>
        <Center>
          <Text fontSize={'6xl'} bold>
            {avgRatings}.0
          </Text>
          {reviews.length === 0 ? null : (
            <UserRating avgRatings={avgRatings} size={5} comp={'avg'} />
          )}
          <Text fontSize={'xs'} color={theme.text}>
            based on {reviews.length} reviews
          </Text>
        </Center>
        <Button onPress={addData}>Add data</Button>
      </Box>

      <FlatList
        maxH={'74%'}
        minH={'74%'}
        data={reviews}
        renderItem={({item}) => <Comment comment={item} />}
        keyExtractor={item => item.id}
        onEndReached={updateReviews}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={!lastPost && <Spinner />}
      />
      <Modal />
    </Box>
  );
}
