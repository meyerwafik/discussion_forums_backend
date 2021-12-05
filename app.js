const { json } = require('express/lib/response');
var db = require('./db');
resparray = []
const getCourses=   ()=>
{
   const sqlRes= db.query("SELECT * FROM courses", function  (err, result) {
    if (err) throw err;
     resparray=result;
  });
  return resparray;  
}
module.exports={getCourses}
