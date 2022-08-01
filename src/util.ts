import { Grades, Student } from "./class";
import { gradesList, studentList } from "./array";
import { retrieveData, writeGrades, writeStudents } from "./file";

// check if the student already exists
    function checkStudent(name:string): Student | undefined{
       // const st: Student | undefined= studentList.find(student=> student.getName() === name)
       //  return st;
        for(const st of studentList){
            if (st.getName() === name) { //Error getName() not a function
                return st;
            }
            console.log(st);
        }
        return undefined
    }

//print grades foreach student

function getStudentGrades(name:string): Array<Grades>{
    let findStudent: Student = studentList.find((stud) =>{
       if (stud.getName() === name) {
        return true
       } else return false
    }) as Student;

    if(findStudent === undefined){
        return [];
    }

    const grades:Array<Grades> = gradesList.filter((g) => {
        if (g.getStudentId() === findStudent.getId()) {
            return true
        } else return false
    })

    return grades;
}


//add students 

async function addStudent(student:Student): Promise<void> {
    studentList.push(student)
    await writeStudents()
}

//update data 

async function updateData() {
    try {
        await writeGrades()
        await writeStudents()
    } catch (error) {
        console.log("Error while updating data")
    }   
}


export{checkStudent, getStudentGrades, addStudent, updateData}