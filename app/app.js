
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
discussion={}
commentObj={}

const getCourses = async (user) => {
  const courses = await database.users.findOne({
    where: { id: user.id },
    include: ["courses"],
  });
  return courses;
};

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

const createComment=async({content},discussionId,user)=>{
   comment=await database.comments.create({
      userId:user.id,content,discussionId
    })
    return comment
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
  return u
} 

module.exports={getCourses,getDiscussions,createDiscussion,getComments,createComment,login,getUser}
