import { model, Schema, Document } from "mongoose";

export interface IStudents extends Document {
  name: string;
  mail: string;
  date: Date;
  updated_at?: Date;
  created_at?: Date;
}

const StudentsSchema: Schema = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  date: { type: Date, required: false },
});

export default model<IStudents>("Students", StudentsSchema);
