import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { Client, Account } from "react-native-appwrite";
import { useRouter,router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { Image } from "react-native";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Cards, FeaturedCard } from "@/components/Card";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import Seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties,getProperties } from "@/lib/appwrite";
import NoResults from "@/components/NoResults";

//Flatlist over scrolllist

interface User {
  name?: string;
  email?: string;
}

export default function Index() {

  const {user} =useGlobalContext();
  const params=useLocalSearchParams<{query?:string;filter?:string;}>();

  const {data : latestProperties ,loading : latestPropertiesLoading} = useAppwrite({
    fn:getLatestProperties
  });

  const {data:properties ,loading, refetch} = useAppwrite({
    fn:getProperties,
    params:{
      filter:params.filter!,
      query:params.query!,
      limit:6,
    },
    skip:true,
  });

  useEffect(()=>{
    refetch({
      filter:params.filter!,
      query:params.query!,
      limit:6
    });
  },[params.filter,params.query]);
  const handleCardPress =(id:string) => router.push(`/properties/${id}`);


  const [User, setUser] = useState<User | null>(null);
  const [Loading, setLoading] = useState(true);
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

  if (Loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      {/* 
      for data seeding : 
      <Button title="Seed" onPress={Seed} /> */}
      <FlatList
        data={properties}
        renderItem={({ item }) => <Cards item={item} onPress={()=>handleCardPress(item.$id)} />}
        keyExtractor={(item, index) => item?.$id || index.toString()}
        // keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size='large' className="text-primary-300 mt-5" />
          ): <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{uri:user?.avatar}}
                  className="size-12 rounded-full border-primary-500 border-2"
                />
                <View className="flex flex-col items-start ml-3 justify-center">
                  <Text className="text-xs font-rubik-bold text-black-100">
                    Good Day!
                  </Text>
                  <Text className="text-base font-rubik-bold text-black-300">
                    {user?.name}
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


              {latestPropertiesLoading?
                <ActivityIndicator size="large" className="text-primary-300" /> : !latestProperties||latestProperties.length ===0 ? <NoResults /> : (
              

              <FlatList
                data={latestProperties}
                renderItem={({ item }) => <FeaturedCard item={item} onPress={()=>handleCardPress(item.$id)} />}
                // keyExtractor={(item) => item.toString()}
                keyExtractor={(item, index) => item?.$id || index.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />  )}


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

              {/* <View className="flex flex-row gap-5 mt-5">
                <FIlters />
              </View> */}
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
