import { Router, Request, Response, NextFunction } from "express";
import { CoursesService } from "../domain/Courses/courses.service";

export default class CoursesApi {
  public router: Router;
  public coursesService = new CoursesService();

  constructor() {
    this.router = Router();
    this.router.post("/course", this.createCourse);
    this.router.get("/courses", this.getAllCourse);
    this.router.get("/courses/:id", this.courseOne);
    this.router.put("/course/:id", this.updateCourse);
  }

  public createCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.coursesService.create(req.body);
      return res.json({
        msg: "Criado com sucesso",
      });
    } catch (e) {
      next(e);
    }
  };

  private getAllCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(await this.coursesService.getCourse());
    } catch (e) {
      next(e);
    }
  };

  private courseOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(await this.coursesService.getCourseById(req.params.id));
    } catch (e) {
      next(e);
    }
  };

  private updateCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(
        await this.coursesService.updateCourse(req.params.id, req.body)
      );
    } catch (e) {
      next(e);
    }
  };
}
