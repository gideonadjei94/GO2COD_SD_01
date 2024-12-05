import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
});

const phonebookSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contacts: [contactSchema],
  },
  {
    timestamps: true,
  }
);

const Phonebook = mongoose.model("Phonebook", phonebookSchema);
export default Phonebook;
