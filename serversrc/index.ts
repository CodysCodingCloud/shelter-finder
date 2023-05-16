const dotenv = require('dotenv').config();
const app = require('./app');
// const db = require('./db');\
const port = process.env.PORT || 5000;
const { conn, seed } = require('./db');

async function init() {
  try {
    await conn();
    console.log('Connection has been established successfully.');
    if (process.env.SEED == 'true') {
      await seed();
      return;
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.listen(port, () =>
    console.log(`listening on http://localhost:${port}/\n`)
  );
}

init();
