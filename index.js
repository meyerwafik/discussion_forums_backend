const express =require("express")
const cors=require("cors")
var app  = express();
app.use(cors());
app.options('*', cors())
var apis=require("./app/app")
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
var bcrypt=require('bcryptjs')
const auth=require('./middleware/auth')
const db = require("./app/models")
const port=process.env.PORT||8000;




db.sequelize.sync({force:true})
  .then((result) => {
    apis.init();
    app.listen(port, () => {
      console.log('Server started');
    })
  })
  .catch((err) => {
    console.log(err);
  })


 app.get('/courses',auth, async (req,res)=>{
    const result=  await apis.getCourses(req.user) 
    res.send(result)
})

app.get('/courses',auth, async (req,res)=>{
  const result=  await apis.getCourses(req.user) 
  res.send(result)
})

app.get(`/courses/:courseId/discussions`,auth,async (req,res)=>{
  const {course,discussions}=  await apis.getDiscussions(req.params.courseId) 
  if(!course){
    res.status(404)
    res.send({error:"Course not found"})
    return;
  }
  res.send({course,discussions})
})


app.get('/user/:userId',auth,async(req,res)=>{
  const user=await apis.getUser(req.params.userId)
  if (!user){
    res.status(404)
    res.send({error:"user not found"})
    return;
  }
  res.send(user)
})


app.post(`/courses/:courseId/discussions`,auth,async (req,res)=>{
  const result=await  apis.createDiscussion(req.body,parseInt(req.params.courseId),req.user)
  res.statusCode=201
  res.send(result)
}
)

app.post(`/courses`,auth,async (req,res)=>{
  if(req.user.role!=="Admin"){
    res.status(400).send({error:"Invalid credentials"})
  }
  else{
    const result=await  apis.createCourse(req.body)
    res.statusCode=201
    res.send(result)
  }
  
}
)

app.post(`/discussions/:discussionId/comments`,auth,async (req,res)=>{
  const result=await apis.createComment(req.body,parseInt(req.params.discussionId),req.user)
  res.statusCode=201
  res.send(result)
}
)

app.get(`/discussions/:discussionId/comments`,async(req,res)=>{
  const {discussion,comments}=  await apis.getComments(req.params.discussionId)
  if(!discussion){
    res.status(404)
    res.send({error:"Discssion not found"})
    return;
  }
  res.send({discussion,comments})
})

app.post('/login',async (req,res)=>{
    // Get user input
    const email = req.body.email;
    const password=req.body.password;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
      return;
    }
    // Validate if user exist in our database
  const user = await apis.login(email,password)
  if(user){
    res.send(user)
    return
  }
  else{
  res.status(400).send("Invalid Credentials")
  }
  
});


app.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { studentName, email, password,userRole } = req.body;

    // Validate user input
    if (!(email && password &&  studentName)) {
      res.status(400).send("All input is required");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
 
    const user = await db.users.create({
      studentName,
      userRole,   
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      pwHash: encryptedPassword,
    });
    res.send(user)
  }
  catch(err){
    console.log(err);
  
  }

});

app.post('/users/create',auth,async(req,res)=>{
  if(req.user.role!=="Admin"){
    res.status(401).send({error:"Invalid credentials"})
  }
  else{
  let { studentName, email, password,userRole } = req.body;
  const user=await apis.createStudent( studentName, email, password,userRole)
  res.send(user)
  }
})

app.delete("/courses/:courseId",auth,async (req,res)=>{
let result=await apis.deleteCourse(req.params.courseId)
if(!result){
  res.status(404).send({error:"Course not found"});
}
else{
res.send("Course deleted successfuly")
}
})


app.patch("/courses/:courseId/users/",auth,async (req,res)=>{
  if(req.user.role!=="Admin"){
    res.status(401).send({error:"Invalid credentials"})
  }
  else{
    if (req.body.operation !== 'delete') {
      res.status(400).send({error:"You need to specify a supportd operation"})
    }

    let {userFound,courseFound,userCorsesFound}=await apis.deleteStudents(req.params.courseId,req.body.ids)
    if(!userFound && !courseFound){
      res.status(400).send({error:"User and course not found"})
    }
    else if(!userFound){
      res.status(400).send({error:"User not found"})
    }
    else if(!courseFound){
      res.status(400).send({error:"Course not found"})
    }
    else{
  

      if(!userCoursesFound){
        res.status(400).send({error:"Some users not enrolled"})
      }
      else{
      res.send("Users deleted successfuly from course")
      }

    }

  }

})


app.delete("/users/:userId",auth,async (req,res)=>{
  if(req.user.role!=="Admin"){
    res.status(401).send({error:"Invalid credentials"})
  }
  else{
    let result=await apis.deleteStudent(req.params.userId)
    if(!result){
      res.status(404).send({error:"User not found"});
    }
    else{
      res.send("User deleted successfuly")
    }
  }
})

app.get("/courses/:courseId/users/", auth, async (req, res) => {
  if(req.user.role!=="Admin"){
    res.status(401).send({error:"Invalid credentials"})
  }
  else{
    const users = await apis.getStudentsByCourse(req.params.courseId)
    res.send(users)
  }
})

app.post("/courses/:courseId/users/:userId",auth,async (req,res)=>{
  if(req.user.role!=="Admin"){
    res.status(401).send({error:"Invalid credentials"})
  }
  else{
    let {user_courses,unique,found}=await apis.addStudent(req.params.courseId,req.params.userId)
    if(!found){
      res.status(400).send({error:"User or course not found"})
    }
    else{
      if(!unique){
        res.status(400).send({error:"Duplicate entry"})
      }
      else{
      res.send(user_courses)
      }

    }

  }

})

app.delete("/comments/:commentId",auth,async (req,res)=>{
 
    let {found,allowed}=await apis.deleteComment(req.params.commentId,req.user)
    console.log(found,allowed)
    if(!found){
      res.statusCode=404
      res.send({error:"Comment not found"});
    }
    else{
      if(!allowed){
        res.statusCode=400
        res.send({error:"Invalid credentials"})
      }
      else{
        res.send("Comment deleted successfuly")
      }
    }
})

app.delete("/discussions/:discussionId",auth,async (req,res)=>{
  let {found,allowed}=await apis.deleteDiscussion(req.params.discussionId,req.user)
  if(!found){
    res.statusCode=404
    res.send({error:"Discussion not found"});
  }
  else{
    if(!allowed){
      res.statusCode=400
      res.send({error:"Invalid credentials"})
    }
    else{
      res.send("Discussion deleted successfuly")
    }
  }
})
