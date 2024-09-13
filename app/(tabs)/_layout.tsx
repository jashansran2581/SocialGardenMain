import React from 'react';
import {Tabs} from 'expo-router'
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

// Define colors outside the styles
const Colors = {
    primary: '#000000', // Dark black
    grey: '#808080',    // Grey color
  };
  
  export default function MyTabs() {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary, // Use primary color from Colors
          tabBarLabelStyle: styles.tabBarLabelStyle, // Use label style from styles
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ size, color }) => <Ionicons name="search" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="wishlists"
          options={{
            tabBarLabel: 'Saved',
            tabBarIcon: ({ size, color }) => <Ionicons name="heart-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            tabBarLabel: 'Inbox',
            tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="message-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarIcon: ({ size, color }) => <Ionicons name="person-circle-outline" size={size} color={color} />,
          }}
        />
      </Tabs>
    );
  }
  
  const styles = StyleSheet.create({
    tabBarLabelStyle: {
      fontFamily: 'SpaceMono', // Set font family globally for tab labels
      fontSize: 12,            // Optional: adjust font size as needed
    },
  });