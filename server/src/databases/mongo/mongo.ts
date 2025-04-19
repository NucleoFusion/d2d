import mongoose from 'mongoose';

const uri = 'mongodb://mongo:mongo@mongo:27017/d2d?authSource=admin';

export async function connectToDatabase() {
  await mongoose.connect(uri);
}

export default mongoose;
