const fastify = require("fastify")({ logger: true });
var students = [];

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});
fastify.post("/add", async (request, reply) => {
  var studentName=request.query.studentName;
  var studentId=request.query.studentID;
  var subject1=request.query.subject1;
  var subject2=request.query.subject2;
  var subject3=request.query.subject3;
  var subject4=request.query.subject4;
  var subject5=request.query.subject5;
   obj={
     "studentName":studentName,
     "studentID":studentId,
     "subject1":subject1,
     "subject2":subject2,
     "subject3":subject3,
     "subject4":subject4,
     "subject5":subject5
  };
  students.push(obj);
  console.log(students);
  return students;
});

fastify.post("/update", async (request, reply) => {
  requestbody=request.query;
  var id=requestbody.studentID;
  var rbsubject1=requestbody.subject1;
  var rbsubject2=requestbody.subject2;
  var rbsubject3=requestbody.subject3;
  var rbsubject4=requestbody.subject4;
  var rbsubject5=requestbody.subject5;
  for(i=0;i<students.length;i++)
  {
    if(students[i].studentID==id)
    {
      obj=students[i];
      for (var key in obj)
       {
        if (obj.hasOwnProperty(key)) 
        {
          if(rbsubject1!=null && rbsubject1!=students[i].subject1)
          {
            students[i].subject1=rbsubject1;
          }
          if(rbsubject2!=null && rbsubject2!=students[i].subject2)
          {
            students[i].subject2=rbsubject2;
          }
          if(rbsubject3!=null && rbsubject3!=students[i].subject3)
          {
            students[i].subject3=rbsubject3;
          }
          if(rbsubject4!=null && rbsubject4!=students[i].subject4)
          {
            students[i].subject4=rbsubject4;
          }
          if(rbsubject5!=null && rbsubject5!=students[i].subject5)
          {
            students[i].subject5=rbsubject5;
          }
            console.log(key + " -> " + obj[key]);
        }
       }
    }
  }
  return students;
});
fastify.delete("/delete", async (request, reply) => {
  var studentId=request.query.studentID;
   for(i=0;i<students.length;i++)
   {
     if(students[i].studentID==studentId)
     {
       if(i>0)
       {
       students.splice(i,i);
       }
       else if(i==0)
       {
         students.shift();
       }
     }
   }
  return students;
});
fastify.get("/report", async (request, reply) => {
  return students;
});
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
