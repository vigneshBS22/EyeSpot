import {
  Button,
  HStack,
  Switch,
  NativeBaseProvider,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useColor} from '../../Context/ColorContext';
import {useDispatch} from 'react-redux';
import {logoutAsync} from '../../features/authSlice';

const SettingScreen = () => {
  const {
    dispatch,
    state: {color, theme},
  } = useColor();

  const dispatch_redux = useDispatch();
  return (
    <NativeBaseProvider>
      <Stack>
        <Button
          mt="2"
          onPress={() => {
            dispatch_redux(logoutAsync());
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
