import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    ...Platform.select({
      ios: {
        maxHeight: '50%',
      },
      android: {
        maxHeight: '60%',
      },
    }),
  },
});
