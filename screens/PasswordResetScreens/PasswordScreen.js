import {Box, FormControl, Input, Button, useToast} from 'native-base';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useColor} from '../../Context/ColorContext';
import {resetPassword, resetUserPasswordAsync} from '../../features/authSlice';
import useFieldUpdate from '../../utils/useFieldUpdate';
import {passwordValidator} from '../../utils/validators';

export default function PasswordScreen({navigation, route}) {
  const newPassword = useFieldUpdate('', passwordValidator, 'register');
  const currentPassword = useFieldUpdate('', passwordValidator, 'register');
  const {
    state: {theme},
  } = useColor();
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const Reset = () => {
    setSubmit(true);
    if (!newPassword.error && !!route.params) {
      dispatch(
        resetPassword({
          oobCode: route.params.oobCode,
          newPassword: newPassword.value,
        }),
      );
      toast.show({
        title: 'password changed successfully',
        status: 'success',
        duration: 2000,
        placement: 'top',
      });
      navigation.navigate('LoginScreen');
    } else if (!currentPassword.error && !newPassword.error) {
      dispatch(
        resetUserPasswordAsync({
          newPassword: newPassword.value,
          currentPassword: currentPassword.value,
        }),
      );
      toast.show({
        title: 'password changed successfully',
        status: 'success',
        duration: 2000,
        placement: 'top',
      });
      navigation.popToTop();
    }
  };

  return (
    <Box>
      {!route.params && (
        <FormControl
          py={4}
          w={{
            base: '90%',
          }}
          mx={'5%'}
          isInvalid={submit && !!currentPassword.error}>
          <Input
            shadow={theme.shadow}
            bg={theme.inputbg}
            variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
            p={4}
            type="password"
            value={currentPassword.value}
            onChangeText={currentPassword.changeHandler}
            color={theme.text}
            placeholder="Enter current password"
          />

          <FormControl.ErrorMessage>
            {currentPassword.error}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
      <FormControl
        py={4}
        w={{
          base: '90%',
        }}
        mx={'5%'}
        isInvalid={submit && !!newPassword.error}>
        <FormControl.HelperText mb={2}>
          Password must be at least 6 characters and include at least one of
          each small,capital, numeric and symbol
        </FormControl.HelperText>
        <Input
          shadow={theme.shadow}
          bg={theme.inputbg}
          variant={theme.bg === 'black' ? 'unstyled' : 'outline'}
          p={4}
          type="password"
          value={newPassword.value}
          onChangeText={newPassword.changeHandler}
          color={theme.text}
          placeholder="Enter new password"
        />

        <FormControl.ErrorMessage>{newPassword.error}</FormControl.ErrorMessage>
      </FormControl>
      <Button
        shadow={8}
        mt="2"
        w="90%"
        p={3}
        colorScheme="indigo"
        mx={'5%'}
        onPress={() => {
          Reset();
        }}>
        Reset password
      </Button>
    </Box>
  );
}
