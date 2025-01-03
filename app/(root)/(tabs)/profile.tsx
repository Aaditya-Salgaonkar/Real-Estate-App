import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { Alert } from "react-native";
import { logout } from "@/lib/appwrite";

interface settingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: settingsItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const profile = () => {
  const { user, refetch } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Sad to see you go", "You have been Logged out Successfully");
      refetch();
    } else {
      Alert.alert(
        "Watch Out!",
        "An error has occurred.\nPlease report the issue to Aaditya"
      );
    }
  };

  // Debugging the avatar url generation
  // useEffect(() => {

  //   getCurrentUser().then((userData) => {
  //     console.log("User data:", userData);
  //   });
  // }, []);
  

  return (
    <SafeAreaView className="h-full bg-white-soft">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between p-3 mt-5">
          <Text className="text-2xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-7" />
        </View>

        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{
                uri: user?.avatar || "https://via.placeholder.com/150",
              }}
              style={{ width: 176, height: 176, borderRadius: 88 }}
            />
            <TouchableOpacity className="absolute bottom-12 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="font-rubik-bold text-3xl mt-4 text-center">
              {user?.name}
            </Text>
          </View>
        </View>
        <View>
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        <View className="flex flex-col pt-5 mt-5 border-t border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>
        </View>

        <View className="flex flex-col pt-5 mt-5 border-t border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
