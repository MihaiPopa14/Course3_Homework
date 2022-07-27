"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("./class");
const util_1 = require("./util");
const array_1 = require("./array");
const inquirer_1 = __importDefault(require("inquirer"));
function menu() {
    inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Select an option: ',
            choices: [
                '1 - Add a new student',
                '2 - Check grades of a student',
                '3 - Grade a student',
                '0 - Exit'
            ]
        },
    ])
        .then(answers => {
        if (answers['menu'] === '1 - Add a new student') {
            insertStudent();
        }
        else if (answers['menu'] === '2 - Check grades of a student') {
            checkGrades();
        }
        else if (answers['menu'] === '3 - Grade a student') {
            addGrades();
        }
        else if (answers['menu'] === '0 - Exit') {
            return;
        }
    });
}
// inserting a new student into the list
function insertStudent() {
    inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'studentName',
            message: 'Student name: ',
            validate: (answer) => {
                if (answer === '') {
                    return "Please enter a valid name";
                }
                return true;
            },
        },
        {
            type: 'number',
            name: 'studentClass',
            message: 'Student class: ',
            validate: (answer) => {
                if (isNaN(answer)) {
                    return "Please enter a number";
                }
                else if (answer < 1 || answer > 13) {
                    return "Wrong class number";
                }
                return true;
            },
        }
    ])
        .then(answers => {
        const newStudent = new class_1.Student(answers['studentName'], answers['studentClass']);
        (0, util_1.addStudent)(newStudent);
        return menu();
    });
}
// add grades to a student
function addGrades() {
    inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'studentName',
            message: 'Student name: ',
            validate: (answer) => {
                if (answer === '') {
                    return "Please enter a valid name";
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'subject',
            message: 'Subject name: ',
            validate: (answer) => {
                if (answer === '') {
                    return "Please enter a valid subject name";
                }
                return true;
            },
        },
        {
            type: 'number',
            name: 'grade',
            message: 'Enter a grade: ',
            validate: (answer) => {
                if (isNaN(answer)) {
                    return "Please enter a number";
                }
                else if (answer < 1 || answer > 10) {
                    return "Invalid grade";
                }
                return true;
            },
        }
    ])
        .then(answers => {
        const searchStudent = (0, util_1.checkStudent)(answers['studentName']);
        if (searchStudent === undefined) {
            console.log("\n This student does not exist");
            return addGrades();
        }
        else {
            const newGrade = new class_1.Grades(searchStudent.getId(), answers['subject'], answers['grade']);
            array_1.gradesList.push(newGrade);
            (0, util_1.updateData)();
            return menu();
        }
    });
}
function checkGrades() {
    inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'studentName',
            message: 'Student name: ',
            validate: (answer) => {
                if (answer === '') {
                    return "Please enter a valid name";
                }
                return true;
            },
        }
    ])
        .then(answer => {
        const name = answer['studentName'];
        if ((0, util_1.checkStudent)(name) === undefined) {
            console.log("\n This student does not exist");
            return checkGrades();
        }
        else {
            const gradesArray = (0, util_1.getStudentGrades)(name);
            if (gradesArray.length === 0) {
                console.log("This student does not have any grades");
                return menu();
            }
            else {
                let gradeData = '\n';
                for (const grade of gradesArray) {
                    const str = `Subject: ${grade.getSubject()} Grade: ${grade.getGrade()}`;
                    gradeData += str;
                    gradeData += '\n';
                }
                console.log(gradeData);
            }
            console.log();
            return menu();
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, util_1.updateData)();
        menu();
    });
}
main();
