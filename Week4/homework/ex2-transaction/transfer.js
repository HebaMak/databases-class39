const { MongoClient } = require('mongodb');
const { changeNumber } = require('./setup.js');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri);

const collection = client.db('databaseWeek4').collection('accounts');

const transfer = async (client, fromAccount, toAccount, amount, remark) => {
  const changedNumberFrom = await changeNumber(fromAccount);
  const changedNumberTo = await changeNumber(toAccount);
  const session = await client.startSession();
  try {
    await session.withTransaction(async () => {
      await collection.updateOne(
        { account_number: fromAccount },
        {
          $inc: { balance: -amount },
          $addToSet: {
            account_changes: {
              change_number: changedNumberFrom,
              amount,
              changed_date: new Date(),
              remark,
            },
          },
        },

        { session }
      );

      await collection.updateOne(
        { account_number: toAccount },
        {
          $inc: { balance: +amount },
          $addToSet: {
            account_changes: {
              change_number: changedNumberTo,
              amount,
              changed_date: new Date(),
              remark,
            },
          },
        },

        { session }
      );
    });
    console.log(`${amount} transferred from ${fromAccount} to ${toAccount}`);
  } finally {
    await session.endSession();
  }
};

module.exports = transfer;
