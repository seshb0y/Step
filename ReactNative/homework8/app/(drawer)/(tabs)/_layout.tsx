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
            backgroundColor: 'white',
        },
        headerShown: false,
        // tabBarBadge: 5,
        // tabBarHideOnKeyboard: true,
        tabBarBackground: () => (<BlurView intensity={100} tint='light' />),
        tabBarShowLabel: false
    }}>
        <Tabs.Screen options={{
            tabBarIcon:({focused}) => <FontAwesome name='home' size={30} color={focused ? 'black' : 'rgb(0, 76, 255)'}/>,
        }} name='index'/>
        <Tabs.Screen options={{
            tabBarIcon:({focused}) => <FontAwesome name='heart' size={30} color={focused ? 'black' : 'rgb(0, 76, 255)'}/>
        }} name='recently'/>
        <Tabs.Screen options={{
            tabBarIcon:({focused}) => <FontAwesome name='home' size={30} color={focused ? 'black' : 'rgb(0, 76, 255)'}/>
        }} name='categories'/>
        <Tabs.Screen options={{
            tabBarIcon:({focused}) => <FontAwesome name='home' size={30} color={focused ? 'black' : 'rgb(0, 76, 255)'}/>
        }} name='cart'/>
        <Tabs.Screen options={{
            tabBarIcon:({focused}) => <FontAwesome name='user' size={30} color={focused ? 'black' : 'rgb(0, 76, 255)'}/>
        }} name='story'/>
    </Tabs>
  )
}
