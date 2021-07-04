import React, {useState, useEffect, useRef} from 'react';
import {View, useColorScheme, Text} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';
import {strings_eng} from '../../values/Strings';
import {useSelector, useDispatch} from 'react-redux';
import PostRecyclerView from '../../components/PostRecyclerView';
import {PostApi} from '../../api/Post';
import {refreshHomeObjects} from '../../store/Post/action';

const HomeScreen = props => {
  const date = useRef();
  const loading = useRef(true);
  const hasMore = useRef(true);

  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.home);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getPosts();
  };

  const getPosts = async () => {
    const posts = await PostApi.getHomeObjects(date.current);
    console.log(posts);
    if (refreshing) setRefreshing(false);
    date.current = posts.date;
    loading.current = false;
    hasMore.current = posts.hasMore;
    dispatch(refreshHomeObjects(posts));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? colors_dark.backgroundColor
          : colors_light.backgroundColor,
      }}>
      <View
        style={{
          backgroundColor: isDarkMode
            ? colors_dark.colorPrimary
            : colors_light.colorPrimary,
          height: 50,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          {strings_eng.home}
        </Text>
      </View>
    </View>
  );
};
export default HomeScreen;
