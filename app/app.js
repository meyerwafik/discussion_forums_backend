
const database = require("./models");
// const user = require("./models/user");
var jwt = require('jsonwebtoken');
var bcrypt=require('bcryptjs');
const dotenv=require("dotenv").config();
courses = []
discussions=[]
comments=[]
discussion={}
course={}
student={}
discussion={}
commentObj={}
found=false
courseFound=false
userFound=false
userCoursesFound=false
allowed=false
unique=false
user_courses={}

const getCourses=   async (user)=>
{
  if(user.role==="Admin"){
    courses=await database.courses.findAll();
  }
  else{
    courses = await database.users.findOne({where:{id:user.id},include:['courses']});
  }
  return courses;  
}


const getDiscussions=   async (courseId)=>
{
  course=await database.courses.findByPk(courseId)
  discussions=await database.discussions.findAll({where:{courseId:courseId},include:["user"]})
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

   
   const deleteComment=async(commentId,user)=>{
   
    let comment=await database.comments.findByPk(commentId)
    console.log(comment)
    if(!comment){
      return {found,allowed}
    }
    else{
      found=true;
      if(comment.userId==user.id||user.role==="Admin")
      {
        comment.destroy();
        allowed=true
      }
      return {found,allowed};
    }
  }


  
  const deleteDiscussion=async(discussionId,user)=>{
   
    let discussion=await database.discussions.findByPk(discussionId)
    
    if(!discussion){
      return {found,allowed}
    }
    else{
      found=true;
      if(discussion.userId==user.id||user.role==="Admin")
      {
        discussion.destroy();
        allowed=true
      }
      return {found,allowed};
    }
  }

   const createStudent=async( studentName, email, password,userRole)=>{
     let  encryptedPassword = await bcrypt.hash(password, 10);
    student=await database.users.create({
      studentName,email,pwHash:encryptedPassword,userRole:userRole
     })
     return student;
    }

    const addStudent=async(courseId,userId)=>{
      found=false
      unique=false
      let course=await database.courses.findByPk(courseId)
      let user=await database.users.findByPk(userId)
      let result=await database.user_courses.findOne({ where: { userId,courseId} })
      if(course && user){
        found=true
      }
     if(!result){
      unique=true
     }
      if(unique && found){
       user_courses=await database.user_courses.create({userId,courseId})  
      }
      return {user_courses,unique,found}
    }


    const deleteStudents=async(courseId,ids)=>{
      courseFound=false
      userFound=true
      userCoursesFound=false
      let course=await database.courses.findByPk(courseId)
      if(course){
        courseFound=true
      }
      for (const i of ids){
      
      let user=await database.users.findByPk(i)
      console.log(i)
      if(!user){
        userFound=false
        break;
      }
    }
    if(userFound&&courseFound){
      userCoursesFound=true
  
      for(const i of ids)
      {
        let result=await database.user_courses.findOne({ where: { userId:i,courseId} })
      
        if(!result){
          userCoursesFound=false
        }
        else{
          result.destroy()
        }
       
      }
      }  
      return {userFound,courseFound,userCoursesFound}
    }
    
    const getStudentsByCourse = async (courseId) => {
      return database.users.findAll({
        attributes: ['id', 'studentName'],
        include: [{
          model:database.courses,
          attributes: [],
          through: {
            attributes: []
          },
          as: 'courses'
        }],
        where: { "$courses.id$": courseId }
      })
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
discussion=await database.discussions.findByPk(discussionId, {include:["user", "course"]})
comments=await database.comments.findAll({where:{discussionId:discussionId},include:["user"]})
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

const init = async () => {
  u1 = await database.users.create({ studentName: "Meyer Wafik", email: "meyer.wafik@gmail.com", pwHash: await bcrypt.hash("password", 10), userRole: "Student" })
  u2 = await database.users.create({ studentName: "Youssef Magdy", email: "youssef.magdy@gmail.com", pwHash: await bcrypt.hash("mypassword", 10), userRole: "Student" })
  u3 = await database.users.create({ studentName: "Marina Hany", email: "marina.hany@gmail.com", pwHash: await bcrypt.hash("justapassword", 10), userRole: "Admin" })
  c1 = await database.courses.create({ courseName: "Programming 1", courseDescription: "The aim of this course is for the students to have a basic understanding of structured programming using C++" })
  c2 = await database.courses.create({ courseName: "Objected Oriented Programming", courseDescription: "The aim of this course is for the students to have a deep understanding of object oriented programming using Java" })
  d1 = await database.discussions.create({ title: "Arrays", discDescription: "This is a forum for discussing the uses and the syntax of arrays." })
  d2 = await database.discussions.create({ title: "Arraylists", discDescription: "This is a forum for discussing the uses and the syntax of arrayslists." })
}

module.exports = { getCourses, getDiscussions, createDiscussion, getComments, createComment, login, getUser, deleteCourse, deleteStudent, createStudent, createCourse, deleteComment, deleteDiscussion, addStudent, getStudentsByCourse, deleteStudents, init}
