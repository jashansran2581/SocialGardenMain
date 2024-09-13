import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';

const page = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    console.log(id)
  return (
    <View>
      <Text>page</Text>
    </View>
  )
}

export default page