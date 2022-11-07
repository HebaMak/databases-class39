const { MongoClient } = require('mongodb');
const { changeNumber } = require('./setup.js');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri);

const collection = client.db('bank').collection('accounts');

const transfer = async (client, sendFrom, sendTo, amount, remark) => {
  const changedNumberFrom = await changeNumber(sendFrom);
  const changedNumberTo = await changeNumber(sendTo);
  const session = await client.startSession();
  try {
    await session.withTransaction(async () => {
      await collection.updateOne(
        { account_number: sendFrom },
        {
          $inc: { balance: -amount },
          $addToSet: {
            account_changes: {
              change_number: changedNumberFrom,
              amount: amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },

        { session }
      );

      await collection.updateOne(
        { account_number: sendTo },
        {
          $inc: { balance: +amount },
          $addToSet: {
            account_changes: {
              change_number: changedNumberTo,
              amount: amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },

        { session }
      );
    });
    console.log(`${amount} transferred from ${sendFrom} to ${sendTo}`);
  } finally {
    await session.endSession();
  }
};

module.exports = transfer;
