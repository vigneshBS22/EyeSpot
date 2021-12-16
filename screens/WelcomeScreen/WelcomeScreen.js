import React from 'react';
import {Text, Button} from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useColor} from '../../Context/ColorContext';

const WelcomeScreen = ({navigation}) => {
  const {
    state: {theme},
  } = useColor();
  return (
    <View style={styles.container}>
      <Text color={theme.text}>Welcome Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Go to Login
      </Button>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
