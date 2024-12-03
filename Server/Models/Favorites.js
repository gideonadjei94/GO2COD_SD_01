import mongoose, { Schema } from "mongoose";

const favoritesSchema = new Schema(
  {
    contacts: [{ type: Schema.Types.ObjectId, ref: "contact" }],
  },
  {
    timestamps: true,
  }
);

const Favorites = mongoose.model("Favorites", favoritesSchema);
export default Favorites;
