const mongoose =  require('mongoose');

let url = 'mongodb://127.0.0.1/playground';

mongoose.connect(url)
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.log('Could not connect to MongoDB...',err));


   const courseShema = new mongoose.Schema({
      name:String,
      author:String,
      tags:[String],
      date:{type:Date,default:Date.now},
      isPublished:Boolean
   });

   //Classes,objects
   //Course,nodeCourse

const Course = mongoose.model('Course',courseShema);

async function createCourse() {
   const course = new Course({
      name : 'Node Js Course',
      author: 'Zakaria kamili',
      tags:['node','backend'],
      isPublished:true
    });
    
    const result = await course.save();
    console.log(result);

}

createCourse();



