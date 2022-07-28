import {Grades, Student} from './class'
import { addStudent, checkStudent, getStudentGrades, updateData } from './util';

import { gradesList } from './array';
import inquirer from 'inquirer';

function menu(): void{
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Select an option: ',
            choices:[
                '1 - Add a new student',
                '2 - Check grades of a student',
                '3 - Grade a student',
                '0 - Exit'
            ]
        },
    ])
    .then(answers =>{
        if(answers['menu'] === '1 - Add a new student'){
            insertStudent()
        } else if (answers['menu'] === '2 - Check grades of a student'){
            checkGrades()
        } else if (answers['menu'] === '3 - Grade a student'){
            addGrades()
        } else if (answers['menu'] === '0 - Exit') {
            return
        }
    })
}


// inserting a new student into the list

function insertStudent(): void{
    inquirer.prompt([
        {
            type: 'input',
            name: 'studentName',
            message: 'Student name: ',
            validate: (answer) => {
                if (answer === '') {
                    return "Please enter a valid name"
                }
                return true
            },
        },
        {
            type: 'number',
            name: 'studentClass',
            message: 'Student class: ',
            validate: (answer) => {
               if(isNaN(answer)){
                    return "Please enter a number"
               }else if( answer < 1 || answer > 13){
                return "Wrong class number"
               }
               return true;
            },
        }

    ])

    .then(answers =>{
        const newStudent: Student = new Student(answers['studentName'], answers['studentClass'])
        addStudent(newStudent)
        return menu()   
    }) 
}

// add grades to a student

function addGrades(): void{
    inquirer.prompt([
        {
            type: 'input',
            name: 'studentName',
            message: 'Student name: ',
            validate: (answer) => {
                if (answer === '') {
                    return "Please enter a valid name"
                }
                return true
            },
        },
        {
            type: 'input',
            name: 'subject',
            message: 'Subject name: ',
            validate: (answer) => {
                if (answer === '') {
                    return "Please enter a valid subject name"
                }
                return true
            },
        },
        {
            type: 'number',
            name: 'grade',
            message: 'Enter a grade: ',
            validate: (answer) => {
               if(isNaN(answer)){
                    return "Please enter a number"
               }else if( answer < 1 || answer > 10){
                return "Invalid grade"
               }
               return true;
            },
        }
    ])

    .then(answers => {
        const searchStudent:Student = checkStudent(answers['studentName']) as Student
        if (searchStudent === undefined) {
            console.log("\n This student does not exist")
            return addGrades()
        } else {
            const newGrade:Grades = new Grades(searchStudent.getId(), answers['subject'], answers['grade'])
            gradesList.push(newGrade)
            updateData()
            return menu()
        }
    })
    
}  

function checkGrades(): void{
    inquirer.prompt([
        {
            type: 'input',
            name: 'studentName',
            message: 'Student name: ',
            validate: (answer) => {
                if (answer === '') {
                    return "Please enter a valid name"
                }
                return true
            },
        }
    ])
    .then(answer =>{
        const name:string = answer['studentName']
        if (checkStudent(name) === undefined) {
            console.log("\n This student does not exist")
            return checkGrades()
        } else{
            const gradesArray: Array<Grades> = getStudentGrades(name)
            if(gradesArray.length === 0 ){
                console.log("This student does not have any grades")
                return menu()
            } else{

            let gradeData:string = '\n'
            for(const grade of gradesArray) {
                const str:string = `Subject: ${grade.getSubject()} Grade: ${grade.getGrade()}`
                gradeData += str;
                gradeData += '\n'
                 }
               console.log(gradeData)  
            }




            console.log()
            return menu()


        }
    })
}

async function main() {
    await updateData()
    menu()
}

main()