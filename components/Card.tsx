import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import images from '@/constants/images';
import { Models } from 'react-native-appwrite';
interface Props{
  item:Models.Document;
  onPress ?: () =>void;
}

export const FeaturedCard = ({item : {image,rating,name,address,price},onPress}:Props) => {
  return (
    <TouchableOpacity onPress={onPress} className='flex flex-col items-start w-72 h-96 relative'>
      <Image source={{uri:image}} className='size-full rounded-3xl'/>
      <Image source={images.cardGradient} className='size-full rounded-3xl absolute bottom-0'/>
      <View className='flex flex-row bg-white/95 absolute top-5 right-5 p-3 rounded-full items-center'>
        <Image source={icons.star} className='size-4'/>
        <Text className='font-rubik-bold ml-1 text-xs text-primary-300 mt-0.5'>{rating}</Text>
      </View>
      <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
        <Text className='font-rubik-extrabold text-xl text-white' numberOfLines={1}>{name}</Text>
        <Text className='text-base font-rubik text-white'>
          {address}
        </Text>
        <View className='flex flex-row items-center justify-between w-full'>
          <Text className='text-sm font-rubik-extrabold text-white mt-3'>INR  {price}</Text>
          <Image source={icons.heart} className='size-5'/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const Cards = ({item : {image,rating,name,address,price},onPress}:Props) => {
    return (
      <TouchableOpacity onPress={onPress} className='flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative'>
        <View>
        <View className='flex flex-row bg-white/95 absolute top-5 z-50 right-5 px-2 rounded-full items-center'>
        <Image source={icons.star} className='size-4'/>
        <Text className='font-rubik-bold ml-1 text-xs text-primary-300 py-2 mt-0.5'>{rating}</Text>
      </View>
      <View>
        <Image source={{uri:image}} className='w-full h-40 rounded-lg'/>
      </View>
      <View className='flex flex-col mt-2'>
        <Text className='font-rubik-bold text-xl text-black-300' numberOfLines={1}>{name}</Text>
        <Text className='text-xs font-rubik text-black-200'>
          {address}
        </Text>
        <View className='flex flex-row items-center justify-between mt-2'>
          <Text className='text-base font-rubik-bold text-primary-300'>INR  {price}</Text>
          <Image source={icons.heart} className='size-5 w-5 h-5 mr-2' tintColor={"#191d31"}/>
        </View>
      </View>
        </View>
      </TouchableOpacity>
    )
  }
