const mongoose = require('mongoose');

// This is because mongoose uses mpromise by default, which is deprecated
mongoose.Promise = Promise;

(async () => await mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
}))();

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;
