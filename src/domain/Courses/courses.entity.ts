import { Schema, Document, model } from "mongoose";

export interface ICourses extends Document {
  title: string;
  description: string;
  updated_at?: Date;
  created_at?: Date;
}

const ICoursesSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
});

export default model<ICourses>("Courses", ICoursesSchema);
