import { gradePath, studentPath } from "./file";

import express from "express";
import fs from "fs";
import { v4 as uuid } from "uuid";

const PORT = 3000;
const app = express();

// const schema = {
//     name: Joi.string().min(3).required(),
//     classNr: Joi.number().integer().min(1).max(12)
// }

type myStudent = {
  id: string;
  name: string;
  classNr: number;
};

// function getStudName<N extends keyof myStudent>(name: N) {
//   return myStudent[name]
// }
// const result = getStudName('name');

type myGrade = {
  id: string;
  studentId: string;
  // studentName: string;
  subject: string;
  grade: number;
};

app.use(express.json());

const students: Array<myStudent> = [];
const grades: Array<myGrade> = [];
readStudents();
readGrades();

app.get("/students", function (req, res) {
  res.send(students);
});

app.get("/grades", function (req, res) {
  res.send(grades);
});

app.get("/grades/:name", (req, res) => {
  const stName = req.params.name;
  const stObj = checkForStudent(stName);
  if (!stObj) {
    res
      .status(400)
      .send("Name is required and and should be at least 3 characters long");
    return;
  }
  const stId = stObj.id;
  const stGradeArray = grades.filter((grade) => grade.studentId === stId);
  res.send(stGradeArray);
});

// app.get("/grades/:studentName", function(req, res){
//   const grade: myGrade | undefined = grades.find(grade => grade === req.params.studentName)
//   res.send(grades.filter())
// });

app.post("/students", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad request
    res
      .status(400)
      .send("Name is required and and should be at least 3 characters long");
    return;
  } else if (
    req.body.classNr < 1 ||
    req.body.classNr > 12 ||
    isNaN(req.body.classNr)
  ) {
    // 400 Bad request
    res
      .status(400)
      .send("Class number should be a number between 1 and 12 inclusive");
    return;
  }

  const student: myStudent = {
    id: uuid(),
    name: req.body.name,
    classNr: req.body.classNr,
  };
  students.push(student);
  res.send(student);
  writeStudents();
});

// -- POST GRADES

app.post("/grades", (req, res) => {
  const existingStudent = checkForStudent(req.body.studentName);

  if (!req.body.studentName || req.body.studentName.length < 3) {
    // 400 Bad request
    res
      .status(400)
      .send("Name is required and and should be at least 3 characters long");
    return;
  } else if (!req.body.subject) {
    // 400 Bad request
    res.status(400).send("You need to specify a subject");
    return;
  } else if (
    isNaN(req.body.grade) ||
    req.body.grade < 1 ||
    req.body.grade > 10
  ) {
    // 400 Bad request
    res.status(400).send("Grade should be a number between 1 and 10");
    return;
  } else if (existingStudent === undefined) {
    //400 Bad request
    res.status(400).send("This student does not exist in our database");
    return;
  }

  const grade: myGrade = {
    id: uuid(),
    // studentName: req.body.studentName,
    studentId: existingStudent.id,
    subject: req.body.subject,
    grade: req.body.grade,
  };
  grades.push(grade);
  res.send(grade);
  writeGrades();
});

function writeStudents(): void {
  fs.writeFile(studentPath, JSON.stringify(students), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function writeGrades(): void {
  fs.writeFile(gradePath, JSON.stringify(grades), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

// const auxStudArray:Array<myStudent> = []
// const auxGradeArray: Array<myGrade> = []

function readStudents(): void {
  try {
    const data: Array<myStudent> = JSON.parse(
      fs.readFileSync(studentPath, "utf-8")
    );
    for (let i = 0; i < data.length; i++) {
      students.push(data[i]);
    }
  } catch (error) {
    console.log("error reading file: ", studentPath);
  }
}

function readGrades(): void {
  try {
    const data: Array<myGrade> = JSON.parse(
      fs.readFileSync(gradePath, "utf-8")
    );
    for (let i = 0; i < data.length; i++) {
      grades.push(data[i]);
    }
  } catch (error) {
    console.log("error reading file: ", gradePath);
  }
}

function checkForStudent(name: string | undefined) {
  for (const studentInstance of students) {
    if (studentInstance.name === name) return studentInstance;
  }
  return undefined;
}

// function checkForGrades(name: string | undefined){
//   for (const gradeInstance of grades) {
//     if (gradeInstance.name === name) return gradeInstance.name;
//   }
//   return undefined;
// }

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}...`));
