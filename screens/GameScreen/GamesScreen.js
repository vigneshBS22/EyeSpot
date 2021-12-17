import React from 'react';
import {NativeBaseProvider, useColorMode, Box, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {useColor} from '../../Context/ColorContext';

const GamesScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <Text color={theme.text}>Game Screen</Text>
      </Box>
    </NativeBaseProvider>
  );
};

export default GamesScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
