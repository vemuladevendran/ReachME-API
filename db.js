'use strict'

const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/user',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

connection
.then(() => {
  console.log('Db connected successfully')
})
.catch((error) => {
  console.error(error);
});