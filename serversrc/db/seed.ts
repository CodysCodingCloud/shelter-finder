const Shelter = require('./Shelter');
import { disconnect } from 'mongoose';
async function resetSeed() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the start of the day
    const query = {
      createdAt: {
        $gte: today,
      },
    };
    const result = await Shelter.deleteMany(query);
    console.log(`deleted enties num: ${result.deletedCount}`);
  } catch (error) {
    console.log('Deletion error:', error);
  }
}
async function seed() {
  if (process.env.RESET_SEED == 'true') {
    await resetSeed();
    return;
  }
  console.log('attemptting seed');
  let count = 0;
  let dupe = 0;
  try {
    // const data = require('../seedData/shelter_data_NY.js');
    const data = require('../seedData/shelter_data_CA.js');
    console.log(data.length, 'items to insert');
    for (const shelterData of data) {
      const sheltterExists = await Shelter.find({
        $and: [
          { city: shelterData.city },
          { name: shelterData.name },
          { addressLine1: shelterData.addressLine1 },
        ],
      });
      if (sheltterExists.length > 0) {
        dupe++;
      } else {
        const shelter = new Shelter(shelterData);
        // const shelter = new Shelter(data[0]);
        shelter.user = '63e6d04dab9210bbfdafea62';
        await shelter.save();
        count++;
      }
    }
    console.log('Seeded', count, 'items');
    console.log('skipped', dupe, 'dupe items');
  } catch (error) {
    console.error('Seeding error:', error);
    console.log('Seeded', count, 'items, before the error occured');
  } finally {
    disconnect();
    console.log('mongoose disconnected');
  }
}
module.exports = seed;
