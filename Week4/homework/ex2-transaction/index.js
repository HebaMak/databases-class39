const { MongoClient } = require('mongodb');
const transfer = require('./transfer.js');
const { createAccount, cleanUpAccounts } = require('./setup.js');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri);

const collection = client.db('bank').collection('accounts');

async function main() {
  try {
    await client.connect();
    await cleanUpAccounts();
    await createAccount(101, 4500);
    await createAccount(102, 2000);
    await transfer(client, 101, 102, 1000, 'donation');
    await transfer(client, 101, 102, 500, 'rent');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
