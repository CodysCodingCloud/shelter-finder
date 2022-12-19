// const app = require('./app');
// const db = require('./db');
// const port = process.env.PORT || 5000;
// // require('dotenv').config();
// async function init() {
//   try {
//     await db.conn.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

//   app.listen(port, () =>
//     console.log(`listening on http://localhost:${port}/\n`)
//   );
// }

// init();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cody:L1gAJ8KA8aG987iM@cluster0.hyiptou.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(async err => {
//   const collection = client.db("blog").collection("posts");
//   // perform actions on the collection object
//   const pipeline = [{'$project':{tltle:1}},{'$limit':20}]
//   const agg = await collection.aggregate(pipeline).toArray()
//   console.log(agg)
//   client.close();
// });
async function run() {
  try {
    const database = client.db('blog');
    const posts = database.collection('posts');
    // Query for a movie that has the title 'Back to the Future'
    const query = [{'$project':{tltle:1}},{'$limit':20}]
    const agg = await posts.aggregate(query).toArray()
    const movie = await posts.findOne({title:'post1'});
    console.log(agg);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);