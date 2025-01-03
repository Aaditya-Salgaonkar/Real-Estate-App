import { View, Text,Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { Tabs } from 'expo-router'
const TabIcon = ({focused,icon,title} : {focused:Boolean; icon: any; title:String;}) =>(
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image source={icon} tintColor={focused?'#002B5B':'#666876'} resizeMode='contain' className='size-7'/>
        <Text className={`${focused?'text-navy font-rubik-medium':'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>{title}</Text>
    </View>
)

const TabsLayout = () => {
  return (
    <Tabs 
        screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{
                backgroundColor:'beige',
                position:'absolute',
                borderTopColor:'#0061ff1A',
                borderTopWidth:1,
                minHeight:70,

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