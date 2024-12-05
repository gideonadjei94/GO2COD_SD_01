import Favorites from "../Models/Favorites.js";

export const addToFavorite = async (req, res) => {
  const { favoritesId } = req.params;
  const { contact } = req.body;
  try {
    const favorite = await Favorites.findById(favoritesId);
    if (!favorite) {
      return res
        .status(404)
        .json({ status: false, message: "Favorite not found" });
    }

    const contactExist = favorite.contacts.filter(
      (c) => c.number === contact.number
    );
    if (contactExist) {
      return res.status(400).json({
        status: false,
        message: "Contact Already exists",
        contact,
      });
    }
    console.log(favorite);
    favorite.contacts.push(contact);
    await favorite.save();
    return res.status(200).json({
      status: true,
      message: "Contact Added Successfully",
      favorite,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const removeFromFavorite = async (req, res) => {
  const { favoriteId, contactId } = req.params;
  try {
    const favorites = await Favorites.findById(favoriteId);
    if (!favorites) {
      return res
        .status(404)
        .json({ status: false, message: "Favorites not found" });
    }

    const contact = favorites.contacts.id(contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ status: false, message: "Contact not found" });
    }
    favorites.contacts = favorites.contacts.filter(
      (contact) => contact._id.toString() !== contactId
    );
    await favorites.save();

    return res.status(200).json({
      status: true,
      message: "Contact successfully removed from favorites",
      favorites,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const getFavorite = async (req, res) => {
  const { favoritesId } = req.params;
  try {
    const favorite = await Favorites.findById(favoritesId);
    if (!favorite) {
      return res
        .status(404)
        .json({ status: false, message: "Favorite not found" });
    }

    return res.status(200).json({
      status: true,
      message: "favorites retrieved successfully",
      favorite,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
