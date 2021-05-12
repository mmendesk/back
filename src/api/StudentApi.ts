import { Router, Request, Response, NextFunction } from "express";
import { StudentService } from "../domain/Students/student.service";

export default class CoursesApi {
  public router: Router;
  public studentService = new StudentService();

  constructor() {
    this.router = Router();
    this.router.post("/student", this.createStudent);
    this.router.get("/students", this.getAllStudent);
    this.router.get("/students/:id", this.studentOne);
    this.router.put("/student/:id", this.updateStudent);
  }

  public createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.studentService.create(req.body);
      return res.json({
        msg: "Criado com sucesso",
      });
    } catch (e) {
      next(e);
    }
  };

  private getAllStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(await this.studentService.getStudent());
    } catch (e) {
      next(e);
    }
  };

  private studentOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(await this.studentService.getStudentById(req.params.id));
    } catch (e) {
      next(e);
    }
  };

  private updateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(
        await this.studentService.updateStudent(req.params.id, req.body)
      );
    } catch (e) {
      next(e);
    }
  };
}
