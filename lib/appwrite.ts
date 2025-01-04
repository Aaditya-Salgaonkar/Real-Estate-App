import { Account, Avatars, Client, OAuthProvider,Databases, Query } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Alert } from "react-native";
export const config = {
  platform: "com.technocrats.dwellio",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId:process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId:process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

// export async function login() {
//   try {
//     const redirectUri = Linking.createURL("/");
//     console.log("Redirect URI:", redirectUri); // Check the redirect URI

//     const response = await account.createOAuth2Token(
//       OAuthProvider.Google,
//       redirectUri
//     );

//     // Check the response
//     //Debugging authentication with google against guest session provided
//     // const response = await account.createOAuth2Session(
//     //   OAuthProvider.Google,
//     //   redirectUri,
//     //   "account"
//     // )

//     if (!response) throw new Error("Failed to Login");

//     const browserResult = await openAuthSessionAsync(
//       response.toString(),
//       redirectUri
//     );
//     console.log("Browser Result:", browserResult); // Check the result

//     if (browserResult.type !== "success")
//       throw new Error("Failed to create token");

//     const url = new URL(browserResult.url);

//     const secret = url.searchParams.get("secret")?.toString();
//     const userId = url.searchParams.get("userId")?.toString();

//     if (!secret || !userId) throw new Error("Create OAuth2 token failed");

//     const session = await account.createSession(userId, secret);
//     console.log("Session created:", session); // Check session details
//     if (!session) throw new Error("Failed to create a session");

//     return true;
//   } catch (error) {
//     console.error("Login error:", error);
//     return false;
//   }
// }

// export async function login() {
//     try {
//       const redirectUri = Linking.createURL('/');
//       const response = await account.createOAuth2Session(OAuthProvider.Google, redirectUri);

//       if (!response) {
//         throw new Error('Failed to login');
//       }

//       console.log('Login successful');
//       return true;
//     } catch (error) {
//       console.error('Login error:', error);
//       return false;
//     }
//   }

export async function login() {
    try {
      const redirectUri = Linking.createURL("/");
      console.log("Initiating OAuth flow with redirect URI:", redirectUri);
  
      const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);
  
      if (!response) throw new Error("Failed to initiate OAuth login.");
  
      const browserResult = await openAuthSessionAsync(response.toString(), redirectUri);
      if (browserResult.type !== "success") throw new Error("OAuth login was not successful.");
  
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret");
      const userId = url.searchParams.get("userId");
  
      if (!secret || !userId) throw new Error("OAuth response is incomplete.");
  
      const session = await account.createSession(userId, secret);
      console.log("Session successfully created:", session);
      Alert.alert("🎉 You’re In! Let the Magic Begin","Welcome back, \n\n🌟Everything’s set up just the way you left it. Dive in and explore the best of Dwellio.");
  
      return true;
    } catch (error:any) {
      console.error("OAuth login error:", error.message);
      return false;
    }
  }
  

export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    
    // console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  //   try {
  //     const session = await account.getSession("current"); // Check if session exists
  //     if (!session) throw new Error("User is not authenticated");
  //     const response = await account.get();
  //     // console.log("User Response:", response);
  //     if (response.$id) {
  //       const userAvatar = avatar.getInitials(response.name);

  //       //console.log("Generated Avatar URL:", userAvatar.toString());

  //       return {
  //         ...response,
  //         avatar: userAvatar.toString(),
  //       };
  //     }
  //   }


  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    // console.error("Error fetching user:", error);
    Alert.alert("🚪 Welcome Back, Don’t Miss Out!","👋 It's been a while since we saw you.\nLog in now to explore whats new in Dwellio\n\nBuilt with care by Aaditya Salgaonkar\nLet's make your experience extraordinary!");

    return null;
  }
}

export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc('$createdAt'), Query.limit(5)]
    )
    return result.documents;
  }
  catch(error) {
      console.error(error);
      return [];
  }
}

export async function getProperties({filter,query,limit} : {
  filter:string;
  query:string;
  limit?:number;
}){
  try{
    const buildQuery=[Query.orderDesc('$createdAt')];

    if(filter && filter !== 'All') {
      buildQuery.push(Query.equal('type',filter));
    }

    if(query) {
      buildQuery.push(
        Query.or([
          Query.search('name',query),
          Query.search('address',query),
          Query.search('type',query)
        ])
      )
    }
    if(limit) buildQuery.push(Query.limit(limit));
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery,
    )
    return result.documents;

  } catch(error) {
    console.error(error);
    return [];
  }
}

export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}