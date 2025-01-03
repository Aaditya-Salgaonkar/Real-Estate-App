import { useGlobalContext } from "@/lib/global-provider";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot, Redirect } from "expo-router";
import AuthMiddleware from "@/app/middleware/AuthMiddleware";

export default function AppLayout() {
    const { loading, isLogged } = useGlobalContext();

    if (loading) {
        return (
            <SafeAreaView className="bg-white h-full flex justify-center items-center">
                <ActivityIndicator className="text-primary-300" size="large" />
            </SafeAreaView>
        );
    }

    // Redirect to sign-in if the user is not logged in
    if (!isLogged) return <Redirect href="/signin" />;

    // Render the rest of the app if the user is authenticated
    return (
        <AuthMiddleware>
            <Slot />
        </AuthMiddleware>
    );
}
