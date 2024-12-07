import Phonebook from "../Models/PhoneBook.js";

export const getAllContacts = async (req, res) => {
  const { phonebookId } = req.param;

  try {
    const phonebook = await Phonebook.findById(phonebookId);
    if (!phonebook) {
      return res
        .status(404)
        .json({ status: false, message: "phonebook not found" });
    }
    const contacts = phonebook.contacts;

    return res.status(200).json({ status: true, contacts });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
export const addContact = async (req, res) => {
  try {
    const { phonebookId } = req.param;
    const { name, number, email } = req.body;

    if (!name || !number || !email) {
      return res.status(400).json({ status: false, message: "Missing fields" });
    }

    // const contact = await Contact.create({ name, number, email });
    const contact = {
      name,
      number,
      email,
    };

    const phonebook = await Phonebook.findById(phonebookId);
    if (!phonebook) {
      return res
        .status(404)
        .json({ status: false, message: "Phonebook not found" });
    }

    phonebook.contacts.push(contact);
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

export const updateContact = async (req, res) => {
  try {
    const { phonebookId, contactId } = req.params;
    const { name, number, email } = req.body;

    const phonebook = await Phonebook.findById(phonebookId);
    if (!phonebook) {
      return res
        .status(404)
        .json({ status: false, message: "Phonebook not found" });
    }

    const contact = phonebook.contacts.id(contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ status: false, message: "Contact not found" });
    }

    contact.name = name || contact.name;
    contact.number = number || contact.number;
    contact.email = email || contact.email;

    await phonebook.save();

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
    const { contactId, phonebookId } = req.params;

    const phonebook = await Phonebook.findById(phonebookId);
    if (!phonebook) {
      return res
        .status(404)
        .json({ status: false, message: "Phonebook not found" });
    }

    const contact = phonebook.contacts.id(contactId);
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
    const { contactId, phonebookId } = req.params;

    const phonebook = await Phonebook.findById(phonebookId);
    if (!phonebook) {
      return res
        .status(404)
        .json({ status: false, message: "Phonebook not found" });
    }

    const contact = phonebook.contacts.id(contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ status: false, message: "Contact not found" });
    }

    phonebook.contacts = phonebook.contacts.filter(
      (contact) => contact._id.toString() !== contactId
    );
    await phonebook.save();

    return res.status(200).json({
      status: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
