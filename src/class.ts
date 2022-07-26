import {v4 as uuid} from "uuid";

class Student{
    
    private id:string;
    private name:string;
    private classNbr:number;

    constructor(name:string,classNbr:number){
        this.id = uuid();
        this.name = name;
        this.classNbr = classNbr;
    }

    getName():string{
        return this.name;
    }

    getId():string{
        return this.id;
    }
}

class Grades{

    private studentId:string;
    private subjectName:string;
    private grade:number;

    constructor(studentId:string, subjectName:string, grade:number){
        this.studentId = studentId;
        this.subjectName = subjectName;
        this.grade = grade;

    }

    getStudentId(): string {
        return this.studentId
    }

    getSubject(): string {
        return this.subjectName
    }
    getGrade(): number {
        return this.grade
    }
    
}

export{Student, Grades}
