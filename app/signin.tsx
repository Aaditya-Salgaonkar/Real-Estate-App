import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { Alert } from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const signin = () => {
  const { refetch, loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/" />;
  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to Login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full ">
      <ScrollView contentContainerClassName="h-full ">
        {/* <Image source={images.signin} className="w-full h-3/5" resizeMode="cover" /> */}
        <ImageBackground
          source={images.onboarding}
          className="w-screen h-screen absolute -top-36"
          resizeMode="contain"
        >
          <View className="p-10 rounded-3xl bg-orange-100 absolute -bottom-52 w-screen">
            <Text className="font-rubik text-base text-center uppercase text-black-200">
              Welcome to Dwellio
            </Text>
            <Text className="text-3xl font-rubik-bold text-black-DEFAULT text-center mt-5">
              Bringing You Closer To{"\n"}
              <Text className="text-navy">Your Ideal Home</Text>
            </Text>

            <Text className="font-rubik text-black-200 text-center mt-10 text-lg">
              Login to Dwellio with Google
            </Text>
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-primary-1200 shadow-md shadow-zinc-400 rounded-full mb-14 w-full py-4 mt-5"
            >
              <View className="flex flex-row items-center justify-center">
                <Image
                  source={icons.google}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-rubik-medium ml-3 text-black-300">
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signin;
