const data = require("./data.json");

/**
 * This function will drop and recreate the collection 
 * of sample data in our csv file.
 * By doing this we ensure that your functions are 
 * working on the same data, very similar to 
 * how you would set up a test environment.
 *
 * @param {MongoClient} client - The client that is connected to your database
 */
const seedDatabase = async (client) => {
  const hasCollection = await client
    .db("databaseWeek4")
    .listCollections({ name: "accounts" })
    .hasNext();

  if (hasCollection) {
    const accountsCollection = await client
      .db("databaseWeek4")
      .collection("accounts");

    // Remove all the documents
    await accountsCollection.deleteMany({});

    // Add our documents
    await accountsCollection.insertMany(data);
  } else {
    throw Error("The collection `accounts` does not exist!");
  }
};

module.exports = {
  seedDatabase,
};
