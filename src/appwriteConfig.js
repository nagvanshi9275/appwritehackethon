import { Client, Account, ID , Databases, Storage} from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('67066f050003ee6c49a2'); // Replace with your Appwrite project ID

// Initialize the Account service
const account = new Account(client);

const database = new Databases(client)
 const storage = new Storage(client);
export { client, account, ID, database, storage };






