import React from 'react';
import {Input, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useColor} from '../Context/ColorContext';

export default function Searchbar() {
  const {
    state: {theme},
  } = useColor();
  return (
    <Input
      placeholder="Search"
      variant="filled"
      width="95%"
      bg={theme.bg}
      borderRadius="10"
      p={5}
      m={2}
      placeholderTextColor="gray.500"
      _hover={{bg: 'gray.200', borderWidth: 0}}
      borderWidth="0"
      _web={{
        _focus: {style: {boxShadow: 'none'}},
      }}
      InputLeftElement={
        <Icon
          ml="2"
          size="5"
          color="gray.500"
          as={<Ionicons name="ios-search" />}
        />
      }
    />
  );
}
