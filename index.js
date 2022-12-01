const mongoose =  require('mongoose');

let url = 'mongodb://127.0.0.1/playground';

mongoose.connect(url)
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.log('Could not connect to MongoDB...',err));


   const courseShema = new mongoose.Schema({
      name: {
         type:String,
         required:true,
         minlength:5,
         maxlength:255
      },
      category : {
        type:String,
        required:true,
        enum:['web','mobile','network'],
        lowercase:true,
        //upercase : true,
        trim:true,
      },
      author:String,
      tags:{
          type:Array,
          validate: {
             isAsync : true,
             validator : function(v,callback) {
               setTimeout(() => {
               // Do some async work.
               const result = v && v.length > 0;
               }, 4000);
             },
             message: 'A course should have at least one tag.'
          },
      },
      date:{type:Date,default:Date.now},
      isPublished:Boolean,
      price : {
         type : Number,
         required : () =>  { return this.isPublished; },
         min : 10,
         max : 200,
         get: v => Math.round(v),
         set: v => Math.round(v)
      },
   });

   //Classes,objects
   //Course,nodeCourse

const Course = mongoose.model('Course',courseShema);

async function createCourse() {

   const course = new Course({
      name : 'Angular Course',
      category:'web',
      author: 'Zakaria kamili',
      tags:['angular','frontend'],
      isPublished:true
   });


   try 
   {
        const result = await course.save();
        console.log(result);
   }
   catch (ex) 
   {
      for(field in ex.errors)
         console.log(ex.errors[field]);
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



