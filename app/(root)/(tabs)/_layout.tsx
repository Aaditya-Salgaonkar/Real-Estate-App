import { View, Text,Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { Tabs } from 'expo-router'
const TabIcon = ({focused,icon,title} : {focused:Boolean; icon: any; title:String;}) =>(
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image source={icon} tintColor={focused?'#FFC300':'#D3D3D3'} resizeMode='contain' className='size-7'/>
        <Text className={`${focused?'text-primary-600 font-rubik-medium':'text-primary-700 font-rubik'} text-xs w-full text-center mt-1`}>{title}</Text>
    </View>
)

const TabsLayout = () => {
  return (
    <Tabs 
        screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{
                backgroundColor:'#0B1D51',
                position:'absolute',
                minHeight:70,
                bottom:5,
                borderTopColor:'#0B1D51',
                maxWidth:380,
                borderRadius:40,
                marginLeft:10
                

            }
        }}
    >
        <Tabs.Screen 
        name="index"
        options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({focused}) => (
                <TabIcon icon={icons.home} focused={focused} title="Home"/>
            )
        }}
        />
        <Tabs.Screen 
        name="explore"
        options={{
            title:'Explore',
            headerShown:false,
            tabBarIcon:({focused}) => (
                <TabIcon icon={icons.search} focused={focused} title="Explore"/>
            )
        }}
        />
        <Tabs.Screen 
        name="profile"
        options={{
            title:'Profile',
            headerShown:false,
            tabBarIcon:({focused}) => (
                <TabIcon icon={icons.person} focused={focused} title="Profile"/>
            )
        }}
        />
    
    </Tabs>
  )
}

export default TabsLayout