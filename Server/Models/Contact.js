import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
