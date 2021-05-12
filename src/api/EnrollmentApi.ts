import { Router, Request, Response, NextFunction } from "express";
import { EnrollmentService } from "../domain/Enrollment/enrollment.service";

export default class EnrollmentApi {
  public router: Router;
  public enrollmentService = new EnrollmentService();

  constructor() {
    this.router = Router();
    this.router.post("/enrollment", this.createEnrollment);
    this.router.get("/enrollments", this.getAllEnrollment);
    this.router.get("/enrollments/:id", this.enrollmentOne);
  }

  private createEnrollment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.enrollmentService.create(
        req.body,
        req.body.studentId,
        req.body.courseId
      );
      return res.json({
        msg: "Criado com sucesso",
      });
    } catch (e) {
      next(e);
    }
  };

  private getAllEnrollment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(await this.enrollmentService.getAllEnrollment(req.body));
    } catch (e) {
      next(e);
    }
  };

  private enrollmentOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(
        await this.enrollmentService.getEnrollmentById(req.params.id)
      );
    } catch (e) {
      next(e);
    }
  };
}
