import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
});

const trashSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    contacts: [contactSchema],
  },
  {
    timestamps: true,
  }
);

const Trash = mongoose.model("Trash", trashSchema);
export default Trash;
