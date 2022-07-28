import express from "express";

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
  res.send(students)
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
})

app.post('/grades', (req, res) => {
    if (!req.body.name|| req.body.name.length < 3) {
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
        studentName: req.body.name,
        subject: req.body.subject,
        grade: req.body.grade
    }
    grades.push(grade)
    res.send(grade)
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}...`))