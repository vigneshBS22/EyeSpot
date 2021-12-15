import {
  Button,
  HStack,
  Switch,
  useColorMode,
  NativeBaseProvider,
  Stack,
  useColorModeValue,
  Text,
  Heading,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useColor} from '../../Context/ColorContext';

const SettingScreen = () => {
  const {
    dispatch,
    state: {color, theme},
  } = useColor();
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <NativeBaseProvider>
      <Stack>
        <Button
          mt="2"
          onPress={() => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'));
          }}
          bg={theme.button}>
          Log out
        </Button>
        <HStack alignItems="center" space={4} justifyContent={'space-between'}>
          <Text color={theme.text}>Dark mode</Text>
          <Switch
            size="sm"
            isChecked={color === 'dark'}
            onToggle={() => {
              dispatch({type: 'TOGGLE_COLOR'});
              toggleColorMode();
            }}
          />
        </HStack>
      </Stack>
    </NativeBaseProvider>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
