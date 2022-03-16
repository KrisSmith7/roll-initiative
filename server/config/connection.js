const mongoose = require('mongoose');

// makes connection to our socialrolls db locally or when deployed
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialrolls', {

    // some of these may be unnecessary for heroku 
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
});

module.exports = mongoose.connection;
