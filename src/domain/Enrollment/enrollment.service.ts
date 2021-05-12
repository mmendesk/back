import { Types } from "mongoose";
import { CoursesService } from "../Courses/courses.service";
import { StudentService } from "../Students/student.service";
import { createValidator } from "../Students/student.validators";
import Entity from "./enrollment.entity";

interface IEnroll {
  _id?: Types.ObjectId;
  name: string;
  students?: Array<string>;
  course?: Array<string>;
  courseId?: Types.ObjectId;
  studentId?: Types.ObjectId;
}

export class EnrollmentService {
  private studentService = new StudentService();
  private courseService = new CoursesService();
  constructor() {}

  async create(data: IEnroll, courseId: string, studentId: string) {
    data.courseId = Types.ObjectId(courseId);
    data.studentId = Types.ObjectId(studentId);
    try {
      await createValidator(data);
    } catch (e) {
      console.log(400, e.erros);
    }

    let studentData = await this.studentService.getStudentById(studentId);
    let courseData = await this.courseService.getCourseById(courseId);
    const enrollmentId = Types.ObjectId();

    const enrollment = await Entity.create({
      name: data.name,
      course: courseId,
      student: studentId,
    });

    data._id = enrollmentId;
    data.courseId = Types.ObjectId(courseId);
    data.studentId = Types.ObjectId(studentId);

    if (!!data.students && data.course) {
      await Entity.create({
        ...data,
        students: data.students.map((st) => {
          return Types.ObjectId(st);
        }),
        course: data.course.map((cr) => {
          return Types.ObjectId(cr);
        }),
      });
    }

    return enrollment;
  }

  async getAllEnrollment(enrollmentId: string) {
    await Entity.find({ clientId: Types.ObjectId(enrollmentId) }).sort({
      _id: -1,
    });
  }

  async getEnrollmentById(enrollmentId: string) {
    const enrollment = await Entity.findById(Types.ObjectId(enrollmentId));
    return enrollment;
  }
  async updateEnrollment(enrollmentId: string) {
    let response;
    try {
      response = await Entity.updateOne({ _id: enrollmentId });
    } catch (e) {
      console.log(401, e.erros);
    }

    return response;
  }
}
