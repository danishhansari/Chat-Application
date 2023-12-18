import { Client, Databases } from "appwrite";

const client = new Client();
export const PROJECT_ID = "65805f436c2d4895d9d2";
export const DATABASES_ID = "65806045544a009baa94";
export const COLLECTION_ID_MESSAGES = "658060540a35d92379b4";

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65805f436c2d4895d9d2");

export const databases = new Databases(client);
export default client;
