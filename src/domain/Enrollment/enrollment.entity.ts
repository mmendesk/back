import { Schema, Document, Types, model } from "mongoose";

export interface IEnrollment extends Document {
  studentsId: Types.ObjectId;
  courses: Array<string>;
  name?: string;
  active: boolean;
  updated_at?: Date;
  created_at?: Date;
}

const EnrollmentSchema: Schema = new Schema({
  studentsId: { type: Object, required: false },
  courses: { type: Array },
  name: { type: String, required: false },
  active: { type: Boolean, default: true },
});

export default model<IEnrollment>("Enrollment", EnrollmentSchema);
