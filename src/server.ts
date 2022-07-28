import { gradePath, studentPath } from "./file";

import express from "express";
import fs from "fs"

const PORT = 3000;
const app = express()

// const schema = {
//     name: Joi.string().min(3).required(),
//     classNr: Joi.number().integer().min(1).max(12)
// }


type myStudent = {
    name:string,
    classNr: number
}

type myGrade = {
    studentName: string,
    subject: string,
    grade: number
}

app.use(express.json())

const students: Array<myStudent> = [];
const grades: Array<myGrade> = [];

app.get('/students', function (req, res) {
  res.send(auxStudArray)
})

app.get('/grades', function(req, res){
    res.send(grades)
}) 

app.post('/students', (req, res) => {
    if (!req.body.name|| req.body.name.length < 3) {
        // 400 Bad request
        res.status(400).send('Name is required and and should be at least 3 characters long')
        return
    } else if(req.body.classNr < 1 || req.body.classNr > 12 || isNaN(req.body.classNr)){
        // 400 Bad request
        res.status(400).send('Class number should be a number between 1 and 12 inclusive')
        return
    }

    const student: myStudent = {
        name: req.body.name,
        classNr: req.body.classNr
    }
    students.push(student)
    res.send(student)
    writeStudents()
})

app.post('/grades', (req, res) => {
    if (!req.body.studentName || req.body.studentName.length < 3) {
        // 400 Bad request
        res.status(400).send('Name is required and and should be at least 3 characters long')
        return
    } else if(!req.body.subject){
        // 400 Bad request
        res.status(400).send('You need to specify a subject')
        return
    } else if(isNaN(req.body.grade) || req.body.grade < 1 || req.body.grade > 10){
        // 400 Bad request
        res.status(400).send('Grade should be a number between 1 and 10')
        return
    }

    const grade: myGrade = {
        studentName: req.body.studentName,
        subject: req.body.subject,
        grade: req.body.grade
    }
    grades.push(grade)
    res.send(grade)
    writeGrades()
})

 function writeStudents(): void {
     fs.writeFile(studentPath, JSON.stringify(students), (err) =>{
        if (err) {
            console.error(err)
            return
        }
    })
   
}

 function writeGrades(): void{
     fs.writeFile(gradePath, JSON.stringify(grades), (err) =>{
        if (err) {
            console.error(err)
            return
        }
    })  
}

const auxStudArray:Array<myStudent> = []
const auxGradeArray: Array<myGrade> = []

function readStudents(): void {
    try {
        const data: Array<myStudent> =  JSON.parse(fs.readFileSync(studentPath, 'utf-8'))
        for (let i = 0; i < data.length; i++) {
        auxStudArray.push(data[i]);
      }
    } catch (error) {
        console.log('error reading file: ',studentPath)
    }
      
}


app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}...`))