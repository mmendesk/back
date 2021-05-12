import * as Yup from "yup";
import Entity from "./students.entity";

import { Types } from "mongoose";
const yupConfig = {
  strict: false,
  abortEarly: true,
  stripUnknown: true,
  recursive: true,
};

export const createValidator = (data: any) => {
  const studentCreateSchema = Yup.object({
    name: Yup.string()
      .required("Nome é obrigatório")
      .test(async function (name: string) {
        const { path, createError } = this;

        if (await Entity.findOne({ title: name.toLowerCase() })) {
          return createError({ path, message: "Nome já cadastrado" });
        }
        return true;
      }),
    mail: Yup.string()
      .required("E-mail é obrigatório")
      .test(async function (mail: string) {
        const { path, createError } = this;

        if (await Entity.findOne({ title: mail.toLowerCase() })) {
          return createError({ path, message: "E-mail já cadastrado" });
        }
        return true;
      }),
    date: Yup.string(),
  });

  return studentCreateSchema.validate(data, yupConfig);
};
