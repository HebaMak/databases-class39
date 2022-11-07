const { MongoClient, ServerApiVersion } = require("mongodb");
const { seedDatabase } = require("./seedDatabase.js");

const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URL
const client = new MongoClient(uri);

const collection = client.db('databaseWeek4').collection('population');

const getPopulationPerYear = async (client , country) => {
  const populationPerYear = await collection.aggregate([
    {
      '$match': {
        'Country': country
      }
    }, {
      '$group': {
        '_id': '$Year', 
        'countPopulation': {
          '$sum': {
            '$add': [
              '$M', '$F'
            ]
          }
        }
      }
    }, {
      '$sort': {
        '_id': 1
      }
    }
  ])

  console.log(populationPerYear);
  return populationPerYear
} 

const getPopulationByContinent = async (year , age) => {
  const populationByContinent = await collection.aggregate(
    [
      {
        '$match': {
          'Year': year, 
          'Age': age, 
          'Country': {
            '$in': [
              'ASIA', 'EUROPE', 'LATIN AMERICA AND THE CARIBBEAN', 'NORTHERN AMERICA', 'OCEANIA', 'AFRICA'
            ]
          }
        }
      }, {
        '$set': {
          'TotalPopulation': {
            '$sum': {
              '$add': [
                '$F', '$M'
              ]
            }
          }
        }
      }
    ]
  )

  console.log(populationByContinent)
  return populationByContinent
}


async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    await getPopulationPerYear(client , 'Netherlands')
    await getPopulationByContinent('2020' , '100+')

  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();