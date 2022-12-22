const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const conn = async () => {
  try {
    const db = await mongoose.connect(process.env.ATLAS_URI);
    console.log(`Mongoose Connected: ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = conn;
