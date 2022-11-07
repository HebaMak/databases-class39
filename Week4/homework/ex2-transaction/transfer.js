const { MongoClient } = require("mongodb");

const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URL
const client = new MongoClient(uri);

const collection = client.db('databaseWeek4').collection('accounts');


async function transfer(client, fromAccount, toAccount, amount, remark) {
  const session = await client.startSession();

  try {
    await session.withTransaction(async () => {
      // Remove from fromUser
      await collection.updateOne(
        { account_number: fromAccount },
        { $inc: { balance: amount * -1 }},
        { $push: {
            account_changes: {
              $inc: { change_number: 1 },
              amount: amount* -1,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },
        { session }
    );

      // Add to toUser
      await collection.updateOne(
        { account_number: toAccount },
        { $inc: { balance: amount } }, 
        { $push: {
            account_changes: {
              $inc: { change_number: 1 },
              amount: amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },
        { session }
      );
    })

  } catch (err) {
    await session.abortTransaction();
    console.log(`Transferred Failed! ${err}`);
  } finally {
    await session.endSession();
  }
}

module.exports = transfer