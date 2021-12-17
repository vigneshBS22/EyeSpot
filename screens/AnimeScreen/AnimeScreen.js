import React from 'react';
import {NativeBaseProvider, useColorMode, Box, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {useColor} from '../../Context/ColorContext';

const AnimeScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <Text color={theme.text}>Anime Screen</Text>
      </Box>
    </NativeBaseProvider>
  );
};

export default AnimeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
