const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri);

const collection = client.db('databaseWeek4').collection('accounts');

const cleanUpAccounts = async () => {
  await collection.deleteMany({});
  console.log('accounts collections Deleted');
};

const createAccount = async (accountNumber, balance) => {
  try {
    const newAccount = await collection.insertOne({
      account_number: accountNumber,
      balance: balance,
      account_changes: [],
    });
    console.log(`new account created with id ${newAccount.insertedId}`);
  } catch (error) {
    console.log('error : account not created');
  }
};

const changeNumber = async (accountNumber) => {
  const account = await collection.findOne({
    account_number: accountNumber,
  });
  const numberOfChanges = account.account_changes.length + 1;
  return numberOfChanges;
};

module.exports = { cleanUpAccounts, createAccount, changeNumber };
