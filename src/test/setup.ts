import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  
  process.env.JWT_KEY = 'iwj;adf';

  // mongo = await MongoMemoryServer.create();
  // const mongoUri = await mongo.getUri();
  const mongoUri = 'mongodb://localhost/ticketing-dev-auth-test'; 
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
