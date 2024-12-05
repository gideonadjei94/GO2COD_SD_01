import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
});

const favoritesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    contacts: [contactSchema],
  },
  {
    timestamps: true,
  }
);

const Favorites = mongoose.model("Favorites", favoritesSchema);
export default Favorites;
