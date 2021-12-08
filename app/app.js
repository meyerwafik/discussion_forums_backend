
const database = require("./models");
// const user = require("./models/user");
var jwt = require('jsonwebtoken');
var bcrypt=require('bcryptjs');
const dotenv=require("dotenv").config();
// const user = require("./models/user");
discussions=[]
comments=[]
discussion={}
course={}
student={}
discussion={}
commentObj={}

const getCourses=   async (user)=>
{
  if(user.role==="Student"){
  courses = await database.users.findOne({where:{id:user.id},include:['courses']});
  }
  else{
    courses=await database.courses.findAll();
  }
  return courses;  
}


const getDiscussions=   async (courseId)=>
{
  course=await database.courses.findByPk(courseId)
  discussions=await database.discussions.findAll({where:{courseId:courseId},include:["user"]})
//  discussionsArray=await database.courses.findByPk(courseId,{include:['discussions']})
  return {discussions,course};  
}

const createDiscussion=async ({title,discDescription},courseId,user)=>{
discussion=await database.discussions.create({
title,discDescription,userId:user.id,courseId
})
 return discussion
}

const createCourse=async ({courseName,courseDescription})=>{
  console.log(courseName,courseDescription)
   course=await database.courses.create({
    courseName,courseDescription
  })
   return course
  }

const createComment=async({content},discussionId,user)=>{
   comment=await database.comments.create({
      userId:user.id,content,discussionId
    })
    return comment
   }


   const deleteCourse=async(courseId)=>{
     let success=false;
     let course=await database.courses.findByPk(courseId)
     if(!course){
       return success
     }
     else{
     course.destroy();
     success=true
     return success
     }
   }

   const createStudent=async( studentName, email, password,userRole)=>{
     let  encryptedPassword = await bcrypt.hash(password, 10);
    student=await database.users.create({
      studentName,email,pwHash:encryptedPassword,userRole:userRole
     })
     return student;
    }

   const deleteStudent=async(userId)=>{
    let success=false;
    let user=await database.users.findByPk(userId)
    if(!user){
      return success
    }
    else{
      user.destroy();
    success=true
    return success
    }
  }
   

const getComments=  async (discussionId,userToken)=>
{
// jwt.verify(userToken,process.env.TOKEN_KEY,function(err,decode){
//   d=getDiscussions(discussionId,userToken)//Last Edited
// })
// commentsArray=await database.discussions.findByPk(discussionId,{include:["comments"]})
// return commentsArray

discussion=await database.discussions.findByPk(discussionId)
comments=await database.comments.findAll({where:{discussionId:discussionId},include:["user"]})
//  discussionsArray=await database.courses.findByPk(courseId,{include:['discussions']})
  return {comments,discussion};  
  
}

const getUser=async(userId)=>{
  const user=await database.users.findByPk(userId)
  return user
}

const login = async (email,password)=>
{
u = await database.users.findOne({ where: { email: email} })
  if (u && (await bcrypt.compare(password, u.pwHash))) {
    // Create token
    var token = jwt.sign(
      { id: u.id, email, role: u.userRole },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    
    u.token = token;
  }
 else{
   u=false;
 }
  
  return u
} 

module.exports={getCourses,getDiscussions,createDiscussion,getComments,createComment,login,getUser,deleteCourse,deleteStudent,createStudent,createCourse}
