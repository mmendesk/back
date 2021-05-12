import { Types } from "mongoose";
import { AnyMessageParams } from "yup/lib/types";
import Entity from "./courses.entity";
import { createValidator } from "./courses.validators";

interface ICourses {
  title: string;
  description: string;
}

export class CoursesService {
  constructor() {}

  async create(data: ICourses) {
    try {
      await createValidator(data);
    } catch (e) {
      console.log(400, e.erros);
    }
    const course = await Entity.create({
      title: data.title,
      description: data.description,
    });

    return course;
  }

  async getCourse() {
    return Entity.find().sort({ _id: -1 });
  }

  async getCourseById(courseId: string) {
    const course = await Entity.findById(Types.ObjectId(courseId));
    return course;
  }
  async updateCourse(data: any, courseId: string) {
    let response;
    try {
      response = await Entity.updateOne({ _id: courseId }, data);
    } catch (e) {
      console.log(401, e.erros);
    }

    return response;
  }
}
