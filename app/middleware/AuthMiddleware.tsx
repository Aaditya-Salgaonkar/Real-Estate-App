import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import { account } from "@/lib/appwrite"; // Update the path to where you exported `account`

const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Avoid calling hooks conditionally; keep logic inside useEffect
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get(); // Checks if a session exists
        // Set authentication state based on the user check
        if (user) {
          console.log("User logged in:", user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);  // No user found, set to false
          router.replace("/signin");  // Redirect to sign-in
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        setIsAuthenticated(false);  // Authentication error, set to false
        router.replace("/signin");  // Redirect to sign-in if error
      } finally {
        setLoading(false);  // Authentication check is complete, stop loading
      }
    };

    checkAuth();
  }, [router]); // The effect will run on mount and if `router` changes

  if (loading) {
    // Show loading spinner while checking authentication
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // If not authenticated, render nothing
  if (!isAuthenticated) {
    return null;
  }

  // Render protected content if authenticated
  return <>{children}</>;
};

export default AuthMiddleware;
