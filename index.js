const mongoose =  require('mongoose');

let url = 'mongodb://127.0.0.1/playground';

mongoose.connect(url)
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.log('Could not connect to MongoDB...',err));


   const courseShema = new mongoose.Schema({
      name: {type:String,required:true},
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
      // name : 'Angular Course',
      author: 'Zakaria kamili',
      tags:['angular','frontend'],
      isPublished:true
   });


   try {

      const result = await course.save();
      console.log(result);

   }
   catch (ex) 
   {
        console.log(ex.message);
   }
    


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
                         // Starts with Zakaria
                        .find({author:/^Zakaria/})
                        // Ends with Kamili
                        .find({author:/kamili$/i})
                        //Contains Zakaria
                        .find({author:/.*Zakaria.*/i})
                        .limit(10)
                        .sort({name:1})
                        .select({name:1,tags:1});
                     console.log(courses);
}


async function getCoursesCount() {
   const courses = await Course
                         // Starts with Zakaria
                        .find({author:/^Zakaria/,isPublished:true})
                        .limit(10)
                        .sort({name:1})
                        .count();
                     console.log(courses);
}

async function getCoursesPaginate() {
                const pageNumber = 2;
                const pageSize = 10;
   const courses = await Course
                        .find({author:/^Zakaria/,isPublished:true})
                        .skip((pageNumber - 1) * pageSize)
                        .limit(10)
                        .sort({name:1})
                        .count();
                     console.log(courses);
}

async function updateCourse(id) {

   const course = await Course.findByIdAndUpdate(id,{
       $set : {
         author : 'Jack',
         isPublished:true 
       }    
   });

  console.log(course);

}

async function removeCourse(id) {

 const result = await Course.findByIdAndRemove(id);
 console.log(result);

}

createCourse();

// removeCourse('638746bf655d2d8532c63c84');

// getCourses();
// getCoursesCount();
// getCoursesPaginate();



