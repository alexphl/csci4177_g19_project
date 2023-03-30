/**Author: Crystal Parker B00440168 */
import { Schema, model, models } from "mongoose";
//mongoose.set('debug', true);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default models.User || model("User", userSchema);
