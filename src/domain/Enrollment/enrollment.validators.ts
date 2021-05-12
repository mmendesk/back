import * as Yup from "yup";

import { Types } from "mongoose";
const yupConfig = {
  strict: false,
  abortEarly: true,
  stripUnknown: true,
  recursive: true,
};

export const createValidator = (data: any) => {
  const enrollmentCreateSchema = Yup.object({
    name: Yup.string(),
    courses: Yup.array(),
    students: Yup.array(),
  });

  return enrollmentCreateSchema.validate(data, yupConfig);
};
