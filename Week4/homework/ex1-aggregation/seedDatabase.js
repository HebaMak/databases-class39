const csvtojson = require('csvtojson')

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
    .listCollections({ name: "population" })
    .hasNext();

  if (hasCollection) {
    const populationCollection = await client
      .db("databaseWeek4")
      .collection("population");

    // Remove all the documents
    await populationCollection.deleteMany({});

    // Convert data to array version of elements
    const data = await csvtojson().fromFile('population_pyramid_1950-2022.csv')
    console.log('our collection data ...', data)
    
  
    const documents = data.map((dataItem) => {  
      return {
        Country: dataItem.Country,
        Year: dataItem.Year,
        Age: dataItem.Age,
        M: parseInt(dataItem.M),
        F: parseInt(dataItem.F),
      };
    });
    console.log('our collection data ...', documents)


    // Add our documents
    await populationCollection.insertMany(documents);
  } else {
    throw Error("The collection `population` does not exist!");
  }
};

module.exports = {
  seedDatabase,
};
