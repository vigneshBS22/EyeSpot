import React from 'react';
import {Input, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useColor} from '../Context/ColorContext';

export default function Searchbar({search, setSearch}) {
  const {
    state: {theme},
  } = useColor();

  return (
    <Input
      placeholder="Search"
      width="95%"
      borderRadius="10"
      color={theme.text}
      p={5}
      m={2}
      borderWidth="0"
      InputLeftElement={
        <Icon
          ml="2"
          size="5"
          as={<Ionicons name="ios-search" />}
          color={theme.text}
        />
      }
      value={search}
      onChangeText={text => setSearch(text)}
    />
  );
}
