import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, databases, avatars } from "./config";
import { error } from "console";
// import { Url } from "url";

export async function createUserAccount(user: INewUser) {
    try {
       const newAccount = await account.create (
        ID.unique(),
         user.email,
         user.password,
         user.name,
       ) 

       if (!newAccount) throw error;

       const avatarUrl = avatars.getInitials(user.name);

       const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl,
       });
       return newUser;
    } catch (error) {
        return error;
        console.log(error);
    }
}

export async function saveUserToDB(user:{
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId,
        ID.unique(),
        user,
      )
      return newUser;
    } catch (error) {
        return error;
        console.log(error)
    }
}
export async function SignInAccount(user: {email: string; password: string}) {
    try {
        const session = await account.createEmailSession(user.email, user.password)
    } catch (error) {
        return error;
        console.log(error);
    }
}

export async function getCurrentUser() {
    try {
      const currentAcount = await account.get()
      if(!currentAcount) throw error;
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentAcount.$id)]
      );

      if (!currentUser) throw error;
      return currentUser.documents[0];
      
    } catch (error) {
        console.log(error)
    }
}