import mongoose, { mongo, Schema } from "mongoose";

const groupSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
