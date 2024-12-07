import mongoose, { mongo, Schema } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
});

const groupSchema = new Schema({
  name: { type: String, required: true },
  contacts: [contactSchema],
});
const groupsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    groups: [groupSchema],
  },
  {
    timestamps: true,
  }
);

const Groups = mongoose.model("Groups", groupsSchema);
export default Groups;
