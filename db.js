'use strict'

const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://deva:27082002devendran@cluster0-shard-00-00.vktwz.mongodb.net:27017,cluster0-shard-00-01.vktwz.mongodb.net:27017,cluster0-shard-00-02.vktwz.mongodb.net:27017/test?replicaSet=atlas-42luua-shard-0&ssl=true&authSource=admin',
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