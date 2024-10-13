import { Client, Account, ID } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('67066f050003ee6c49a2'); // Replace with your Appwrite project ID

// Initialize the Account service
const account = new Account(client);

export { client, account, ID };
