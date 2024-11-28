import Contact from "../Models/Contact.js";
import Phonebook from "../Models/PhoneBook.js";

export const addContact = async (req, res) => {
  try {
    const { name, number, email, phonebookId } = req.body;

    if (!name || !number || !email || !phonebookId) {
      return res.status(400).json({ status: false, message: "Missing fields" });
    }

    const contact = await Contact.create({ name, number, email });

    const phonebook = await Phonebook.findById(phonebookId);
    if (!phonebook) {
      return res
        .status(404)
        .json({ status: false, message: "Phonebook not found" });
    }

    phonebook.contacts.push(contact._id);
    await phonebook.save();

    return res.status(201).json({
      status: true,
      message: "Contact added successfully",
      contact,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const updatecontact = async (req, res) => {
  try {
    const { contactId, name, number, email } = req.body;

    if (!contactId) {
      return res
        .status(400)
        .json({ status: false, message: "Contact ID is required" });
    }

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ status: false, message: "Contact not found" });
    }

    contact.name = name || contact.name;
    contact.number = number || contact.number;
    contact.email = email || contact.email;

    await contact.save();

    return res.status(200).json({
      status: true,
      message: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const getContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res
        .status(404)
        .json({ status: false, message: "Contact not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Contact retrieved successfully",
      contact,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res
        .status(404)
        .json({ status: false, message: "Contact not found" });
    }

    // Remove contact from associated phonebook
    await Phonebook.updateMany({ contacts: id }, { $pull: { contacts: id } });

    await contact.remove();

    return res.status(200).json({
      status: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
