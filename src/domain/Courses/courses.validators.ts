import * as Yup from "yup";
import Entity from "./courses.entity";

import { Types } from "mongoose";
const yupConfig = {
  strict: false,
  abortEarly: true,
  stripUnknown: true,
  recursive: true,
};

export const createValidator = (data: any) => {
  const courseCreateSchema = Yup.object({
    title: Yup.string()
      .required("Titulo é obrigatório")
      .test(async function (title: string) {
        const { path, createError } = this;

        if (await Entity.findOne({ title: title.toLowerCase() })) {
          return createError({ path, message: "Titulo já cadastrado" });
        }
        return true;
      }),
    description: Yup.string(),
  });

  return courseCreateSchema.validate(data, yupConfig);
};
