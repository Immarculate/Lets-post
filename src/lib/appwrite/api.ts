import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, databases, avatars } from "./config";
// import { error } from "console";
// import { Url } from "url";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
      accountId: newAccount.$id,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
  accountId: string;
}) {
  console.log({ user });
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    return error;
    console.log(error);
  }
}
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    return error;
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAcount = await account.get();
    console.log({ currentAcount });
    if (!currentAcount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAcount.$id)]
    );

    console.log({ currentUser });

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    return error;
    console.log(error);
  }
}
