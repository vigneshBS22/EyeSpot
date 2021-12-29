import {
  Button,
  HStack,
  Switch,
  NativeBaseProvider,
  Stack,
  Text,
  useToast,
} from 'native-base';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useColor} from '../../Context/ColorContext';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAsync, selectAuth} from '../../features/authSlice';

const SettingScreen = ({navigation}) => {
  const {
    dispatch,
    state: {color, theme},
  } = useColor();

  const {email, loginType} = useSelector(selectAuth);

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
        {loginType === 'email' && (
          <Button
            mt="2"
            onPress={() => {
              // dispatch_redux(resetPasswordAsync(email));
              navigation.navigate('Password');
            }}
            bg={theme.button}>
            Reset Password
          </Button>
        )}
      </Stack>
    </NativeBaseProvider>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
