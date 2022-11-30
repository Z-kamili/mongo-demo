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
      name : 'Angular Course',
      author: 'Zakaria kamili',
      tags:['angular','frontend'],
      isPublished:true
});
    
    const result = await course.save();
    console.log(result);

}

async function getCourses() {
   //eq (equal)
   //ne (not equal)
   //gt (greater than)
   //gte (greater than or equal to)
   //lt (less than)
   //lte (less than or equal to)
   //in 
   //nin (not in)
   const courses = await Course
                        // .find({author:'Zakaria kamili',isPublished:true})
                        .find()
                        .or([{author:'Zakaria kamili'},{isPublished:true}])
                        .limit(10)
                        .sort({name:1})
                        .select({name:1,tags:1});
                     console.log(courses);
}

getCourses();



