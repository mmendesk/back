import * as express from "express";
import CoursesApi from "../api/CoursesApi";
import StudentApi from "../api/StudentApi";
import EnrollmentApi from "../api/EnrollmentApi";
const router = express.Router();

router.use("/", new CoursesApi().router);
router.use("/", new StudentApi().router);
router.use("/", new EnrollmentApi().router);

module.exports = router;
