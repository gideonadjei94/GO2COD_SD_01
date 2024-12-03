import mongoose, { Schema } from "mongoose";

const trashSchema = new Schema(
  {
    contact: [{ type: Schema.Types.ObjectId, ref: "contact" }],
  },
  {
    timestamps: true,
  }
);

const Trash = mongoose.model("Trash", trashSchema);
export default Trash;
