const dotenv = require('dotenv').config();
const app = require('./app');
// const db = require('./db');\
const port = process.env.PORT || 5000;
const { conn, seed } = require('./db');
interface LinkList {
  state: string;
  stateAbbreviation: string;
  link: string;
  saveFile: string;
}
async function init() {
  try {
    await conn();
    console.log('Connection has been established successfully.');
    if (process.env.SEED == 'true') {
      const linklist: LinkList[] = require('./seedData/state_links.json');
      for (let stateinfo of linklist) {
        const link = stateinfo.saveFile + '.json';
        await seed(link);
      }
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
