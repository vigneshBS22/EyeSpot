import React from 'react';
import {Box, Center, HStack, Icon, Text} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function UserRating({avgRatings, size, comp}) {
  return (
    <Box>
      <Center>
        <HStack>
          {[...Array(Math.floor(avgRatings))].map((e, index) => {
            return (
              <Icon
                key={index + 'full'}
                ml="1"
                size={size}
                color="yellow.500"
                as={<FontAwesome name="star" />}
              />
            );
          })}
          {comp === 'avg' ? (
            avgRatings !== 5 ? (
              [...Array(5 - Math.floor(avgRatings))].map((e, index) => (
                <Icon
                  key={index + 'empty'}
                  ml="1"
                  size={size}
                  color="gray.500"
                  as={<FontAwesome name="star" />}
                />
              ))
            ) : null
          ) : (
            <Center>
              <Text ml={2} my={-2} bold>
                {avgRatings}.0
              </Text>
            </Center>
          )}
        </HStack>
      </Center>
    </Box>
  );
}
