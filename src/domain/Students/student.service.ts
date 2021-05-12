import { Types } from "mongoose";
import { createValidator } from "./student.validators";
import Entity from "./students.entity";

interface IStudent {
  name: string;
  mail: string;
  date: Date;
}

export class StudentService {
  constructor() {}

  async create(data: IStudent) {
    try {
      await createValidator(data);
    } catch (e) {
      console.log(400, e.erros);
    }
    const student = await Entity.create({
      name: data.name,
      mail: data.mail,
      date: data.date,
    });

    return student;
  }

  async getStudent() {
    return Entity.find().sort({ _id: -1 });
  }

  async getStudentById(studentId: string) {
    const student = await Entity.findById(Types.ObjectId(studentId));
    return student;
  }
  async updateStudent(data: any, studentId: string) {
    let response;
    try {
      response = await Entity.updateOne({ _id: studentId }, data);
    } catch (e) {
      console.log(401, e.erros);
    }

    return response;
  }
}
