const mongoose =  require('mongoose');

mongoose.connect('mongodb://127.0.0.1/playground')
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.log('Could not connect to MongoDB...',err));


   const courseShema = new mongoose.Schema({
      name:String,
      author:String,
      tags:[String],
      date:{type:Date,default:Date.now},
      isPublished:Boolean
   });

