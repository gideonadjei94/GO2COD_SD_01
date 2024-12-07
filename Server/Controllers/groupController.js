import Groups from "../Models/Groups.js";
import User from "../Models/User.js";

export const createGroup = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  try {
    const userGroups = await Groups.findOne({ user: userId });

    if (!userGroups) {
      return res
        .status(404)
        .json({ status: false, message: "User groups not found" });
    }

    if (!name) {
      return res
        .status(400)
        .json({ status: false, message: "Group Name is required" });
    }

    const groupExists = userGroups.groups.some((group) => group.name === name);
    if (groupExists) {
      return res
        .status(400)
        .json({ status: false, message: "This group already exists" });
    }

    userGroups.groups.push({ name, contacts: [] });
    await userGroups.save();

    return res.status(201).json({
      status: true,
      message: "Group created successfully",
      userGroups,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const addContactToGroup = async (req, res) => {
  const { userId, groupId } = req.params;
  const { contact } = req.body;

  try {
    const userGroups = await Groups.findOne({ user: userId });
    if (!userGroups) {
      return res
        .status(404)
        .json({ status: false, message: "user Groups not found" });
    }

    const group = userGroups.groups.find(
      (group) => group._id.toString() === groupId
    );
    if (!group) {
      return res.status(404).json({
        status: false,
        message: "Group not found",
      });
    }
    group.contacts.push(contact);
    await userGroups.save();

    return res
      .status(201)
      .json({ status: false, message: "Contact added successfully", group });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const removeContactFromGroup = async (req, res) => {
  const { userId, groupId, contactId } = req.params;
  try {
    const userGroups = await Groups.findOne({ user: userId });
    if (!userGroups) {
      return res
        .status(404)
        .json({ status: false, message: "user Groups not found" });
    }
    const group = userGroups.groups.find(
      (group) => group._id.toString() === groupId
    );
    if (!group) {
      return res.status(404).json({
        status: false,
        message: "Group not found",
      });
    }
    group.contacts = group.contacts.filter(
      (contact) => contact._id.toString() !== contactId
    );
    await userGroups.save();

    return res.status(200).json({
      status: true,
      message: "Contact removed successfully",
      group,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getUserGroups = async (req, res) => {
  const { userId } = req.params;
  try {
    const userGroups = await Groups.findOne({ user: userId });

    if (!userGroups) {
      return res
        .status(404)
        .json({ status: false, message: "User has no groups record" });
    }

    const userGroup = userGroups.groups;
    if (!userGroup || userGroup.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "User has no groups" });
    }

    return res.status(200).json({
      status: true,
      message: "User groups retrieved succesfully",
      userGroups,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const getGroup = async (req, res) => {
  const { userId, groupId } = req.params;
  try {
    const userGroups = await Groups.findOne({ user: userId });
    if (!userGroups) {
      return res
        .status(404)
        .json({ status: false, message: "user Groups not found" });
    }

    const group = userGroups.groups.find(
      (group) => group._id.toString() === groupId
    );
    if (!group) {
      return res.status(404).json({
        status: false,
        message: "Group not found",
      });
    }

    return res
      .status(200)
      .json({ status: true, message: "Groups retrieved successfully", group });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteGroup = async (req, res) => {
  const { userId, groupId } = req.params;
  try {
    const userGroups = await Groups.findOne({ user: userId });
    if (!userGroups) {
      return res
        .status(404)
        .json({ status: false, message: "user Groups not found" });
    }

    const groupExists = userGroups.groups.some(
      (group) => group._id.toString() === groupId
    );

    if (!groupExists) {
      return res
        .status(404)
        .json({ status: false, message: "Group not found" });
    }

    userGroups.groups = userGroups.groups.filter(
      (group) => group._id.toString() !== groupId
    );
    await userGroups.save();

    return res.status(200).json({
      status: true,
      message: "Group Deleted successfully",
      userGroups,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
