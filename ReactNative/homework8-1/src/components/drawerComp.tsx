import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

export default function drawerComp(props: any) {
  return (
    <DrawerContentScrollView>
        
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: 40,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            gap: 30
        }}>
            <View style={{
                padding: 40,
                backgroundColor: 'red',
                borderRadius: 40
                }}>

                </View>
            <View style={{
                gap: 15
            }}>
                <Text>Sophia Rose</Text>
                <Text>UX/UI Designer</Text>
            </View>
        </View>
        <DrawerItemList {...props}/>

    </DrawerContentScrollView>

  )
}

const styles = StyleSheet.create({})