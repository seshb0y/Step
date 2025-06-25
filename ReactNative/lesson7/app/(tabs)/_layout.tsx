import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import FontAwesome  from '@expo/vector-icons/FontAwesome'
import React from 'react'

export default function _layout() {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'purple',
        tabBarStyle:{
            backgroundColor: 'rgb(141, 86, 163)',
        },
        headerShown: false,
        // tabBarBadge: 5,
        // tabBarHideOnKeyboard: true,
        tabBarBackground: () => (<BlurView intensity={100} tint='light' />),
        tabBarIcon:() => <FontAwesome name='home' size={24} color='red'/>
    }}>
        <Tabs.Screen options={{
            tabBarIcon:() => <FontAwesome name='home' size={24} color='red'/>
        }} name='index'/>
        <Tabs.Screen options={{
            tabBarIcon:() => <FontAwesome name='gears' size={24} color='red'/>
        }} name='settings'/>
    </Tabs>
  )
}
