import mongoose, { Schema } from "mongoose";

const phonebookSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
  },
  {
    timestamps: true,
  }
);

const Phonebook = mongoose.model("Phonebook", phonebookSchema);
export default Phonebook;
