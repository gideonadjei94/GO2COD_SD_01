import Trash from "../Models/Trash.js";
import Phonebook from "../Models/PhoneBook.js";

export const getTrash = async (req, res) => {
  const { trashId } = req.params;
  try {
    const trash = await Trash.findById(trashId);
    if (!trash) {
      return res
        .status(404)
        .json({ status: false, message: "Trash not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Trash Fetched successfully", trash });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const addContact = async (req, res) => {
  const { trashId, phonebookId, contactId } = req.params;
  const trash = await Trash.findById(trashId);
  const phonebook = await Phonebook.findById(phonebookId);
  if (!trash) {
    return res.status(404).json({ status: false, message: "Trash not found" });
  }
  if (!phonebook) {
    return res
      .status(404)
      .json({ status: false, message: "User phonebook  not found" });
  }

  const contact = phonebook.contacts.filter(
    (contact) => contact._id.toString() === contactId
  );
  if (!contact) {
    return res
      .status(404)
      .json({ status: false, message: "Contact  not found" });
  }

  trash.contacts.push(contact);
  await trash.save();
  phonebook.contacts = phonebook.contacts.filter(
    (c) => c.number !== contact.number
  );
  await phonebook.save();
  return res.status(200).json({
    status: true,
    message: "Contact successfully added to trash",
    trash,
  });
};

export const removeContact = async (req, res) => {
  const { trashId, contactId, phonebookId } = req.params;

  try {
    const trash = await Trash.findById(trashId);
    const phonebook = await Phonebook.findById(phonebookId);
    if (!trash) {
      if (!trash) {
        return res
          .status(404)
          .json({ status: false, message: "Trash not found" });
      }
    }

    const contact = trash.contacts.filter(
      (c) => c._id.toString() === contactId
    );
    trash.contacts = trash.contacts.filter(
      (c) => c._id.toString() !== contactId
    );
    await trash.save();

    phonebook.contacts.push(contact);
    await phonebook.save();
    return res.status(200).json({
      status: true,
      message: "Contact successfully removed from trash",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  const { trashId, contactId } = req.params;

  try {
    const trash = await Trash.findById(trashId);
    if (!trash) {
      return res
        .status(404)
        .json({ status: false, message: "Trash not found" });
    }

    trash.contacts = trash.contacts.filter(
      (contact) => contact._id.toString() !== contactId
    );
    await trash.save();
    return res.status(200).json({
      status: true,
      message: "Contact successfully Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
