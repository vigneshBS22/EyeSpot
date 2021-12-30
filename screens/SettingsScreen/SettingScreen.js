import {
  HStack,
  Switch,
  NativeBaseProvider,
  Stack,
  Text,
  Box,
  Center,
  Avatar,
  Divider,
  Icon,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useColor} from '../../Context/ColorContext';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAsync, selectAuth, updateClick} from '../../features/authSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingScreen = ({navigation}) => {
  const {
    dispatch,
    state: {color, theme},
  } = useColor();

  const {loginType, name} = useSelector(selectAuth);

  const dispatch_redux = useDispatch();
  return (
    <NativeBaseProvider>
      <Box p="5">
        <Center flexDir={'row'} justifyContent={'space-between'}>
          <Box>
            <Text fontSize={'xl'} bold color={theme.text}>
              {name}
            </Text>
          </Box>
          <Avatar bg="indigo.500" alignSelf="center" size={'lg'}>
            {name.charAt(0)}
          </Avatar>
        </Center>
      </Box>
      <Stack space={2} divider={<Divider />}>
        <HStack
          p={2}
          onStartShouldSetResponder={() => {
            dispatch_redux(logoutAsync());
            dispatch(updateClick());
          }}>
          <Icon
            size="5"
            mr={4}
            color={theme.text}
            as={<MaterialCommunityIcons name="logout" />}
          />

          <Text width={'100%'} textAlign={'left'} color={theme.text}>
            Logout
          </Text>
        </HStack>
        <HStack alignItems="center" space={4} justifyContent={'space-between'}>
          <Text color={theme.text} p={2}>
            Dark mode
          </Text>
          <Switch
            size="sm"
            isChecked={color === 'dark'}
            onToggle={() => {
              dispatch({type: 'TOGGLE_COLOR'});
            }}
          />
        </HStack>
        {loginType === 'email' && (
          <HStack
            p={2}
            onStartShouldSetResponder={() => {
              navigation.navigate('Password Reset');
            }}>
            <Icon
              size="5"
              mr={4}
              color={theme.text}
              as={<MaterialCommunityIcons name="lock-reset" />}
            />
            <Text width={'100%'} textAlign={'left'} color={theme.text}>
              Reset Password
            </Text>
          </HStack>
        )}
      </Stack>
      <Divider />
    </NativeBaseProvider>
  );
};

export default SettingScreen;
