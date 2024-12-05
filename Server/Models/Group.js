import mongoose, { mongo, Schema } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
});

const groupSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    contacts: [contactSchema],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
