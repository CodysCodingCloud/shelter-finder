import mongoose, { connect } from 'mongoose';
mongoose.set('strictQuery', false);
const ATLAS_URI: string = process.env.ATLAS_URI as string;

const conn = async () => {
  try {
    const db = await connect(ATLAS_URI);
    console.log(`Mongoose Connected: ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default conn;
