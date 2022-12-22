// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// const db = client.db;
// let dbConnection;

// async function run() {
//   try {
//     const database = client.db;
//     const posts = database.collection('posts');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = [{ $project: { tltle: 1 } }, { $limit: 20 }];
//     const agg = await posts.aggregate(query).toArray();
//     const movie = await posts.findOne({ title: 'post1' });
//     console.log(agg);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// const Sequelize = require('sequelize');
// const dbName = 'shopper';

// const config = {};

// if (process.env.DATABASE_URL) {
// 	// process.env.CLIENT_URL = 'https://courage-grace-shopper.herokuapp.com';
// 	config.dialectOptions = { ssl: { require: true, rejectUnauthorized: false } };
// } else {
// 	process.env.CLIENT_URL = 'http://localhost:3000';
// }

// if (process.env.QUIET) {
// 	config.logging = false;
// }
// const conn = new Sequelize(
// 	process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
// 	config
// );

// module.exports = conn;
