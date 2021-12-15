import React from 'react';
import {NativeBaseProvider, useColorMode, Box, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {useColor} from '../../Context/ColorContext';

const HomeScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <Text color={theme.text}>Home Screen</Text>
      </Box>
    </NativeBaseProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
