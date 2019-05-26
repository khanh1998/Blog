import mongoose from 'mongoose';
import config from '../config/index';

mongoose.Promise = global.Promise;
try {
  console.log(config);

  mongoose.connect(config.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
} catch (err) {
  mongoose.createConnection(config.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
}
let connection = mongoose.connection;
connection.on('error', (err) => console.log(`Connection to database fail: ${err}`));
connection.on('connected', () => console.log('Connect to database successfully'));
connection.on('disconnected', () => console.log('Disconnected from database'));
connection.once('SIGINT', () => console.log('Terminated database'));
