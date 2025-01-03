import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button
} from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import { Client, Account } from "react-native-appwrite";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { Image } from "react-native";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Cards, FeaturedCard } from "@/components/Card";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import Seed from "@/lib/seed";
//Flatlist over scrolllist

interface User {
  name?: string;
  email?: string;
}

export default function Index() {

  const {user} =useGlobalContext();
  const [User, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint
    .setProject("676d61c5000c4f1f734c"); // Replace with your project ID

  const account = new Account(client);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await account.get();
        console.log("User authenticated:", currentUser);
        setUser(currentUser); // Set user data on successful authentication
      } catch (error: any) {
        console.error("Authentication failed:", error.message);
        router.replace("/signin"); // Redirect to sign-in page if authentication fails
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <Button title="Seed" onPress={Seed} />
      <FlatList
        data={[1, 2,3,4]}
        renderItem={({ item }) => <Cards />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{uri:user?.avatar}}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-3 justify-center">
                  <Text className="text-xs font-rubik-bold text-black-100">
                    Good Day!
                  </Text>
                  <Text className="text-base font-rubik-bold text-black-300">
                    Aaditya
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6 " />
            </View>
            <Search />

            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl text-black-300 font-rubik-bold">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-navy">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={[5,6,7]}
                renderItem={({ item }) => <FeaturedCard />}
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />


              <View className="flex flex-row items-center justify-between mt-5">
                <Text className="text-xl text-black-300 font-rubik-bold">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-navy">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters />

              <View className="flex flex-row gap-5 mt-5">
                <Cards />
                <Cards />
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
