import { Grades, Student } from "./class";
import { gradesList, studentList } from "./array";

import fs from "fs";

const studentPath = "./output/students.json";
const gradePath = "./output/grades.json";

async function writeStudents(): Promise<void> {
    try {
       await fs.writeFileSync(studentPath, JSON.stringify(studentList))
    } catch (e) {
        console.log("Error while writing to file:", studentPath)
    }
}

async function writeGrades(): Promise<void>{
    try {
        await fs.writeFileSync(gradePath, JSON.stringify(gradesList))
    } catch (error) {
        console.log("Error while writing to file:", gradePath)
    }
}

async function retrieveData(): Promise<void> {
    try {
        let data: Array<Student> = JSON.parse(fs.readFileSync(studentPath, 'utf-8'))
        for (let i = 0; i < data.length; i++) {
            studentList.push(data[i]);
        }
    } catch (error) {
        console.log("Error while reading file:", studentPath)
        return
    }

    try {
        let data: Array<Grades> = JSON.parse(fs.readFileSync(gradePath, 'utf-8'))
        for (let i = 0; i < data.length; i++) {
            gradesList.push(data[i]);
        }
    } catch (error) {
        console.log("Error while reading file:", gradePath)
        return
    }

}

export{writeStudents, writeGrades, retrieveData}