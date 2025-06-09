import { Document, Schema, model, models } from "mongoose";

interface documentType extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema<documentType>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = models.User || model<documentType>("User", userSchema);

export default userModel;
