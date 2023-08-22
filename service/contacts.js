const Contact = require("../service/schemas/contact");

const getAllContacts = async (userId) => {
  try {
    return await Contact.find({ owner: userId });
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (userId, contactId) => {
  try {
    return await Contact.findById({ owner: userId, _id: contactId });
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (userId, contactId) => {
  try {
    return await Contact.findByIdAndRemove({ owner: userId, _id: contactId });
  } catch (err) {
    console.log(err.message);
  }
};

const createContact = async (body) => {
  try {
    return Contact.create(body);
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (userId, contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(
      { owner: userId, _id: contactId },
      body,
      { new: true }
    );
  } catch (err) {
    console.log(err.message);
  }
};

const getFavorites = async (userId, contactId, favorite) => {
  try {
    return Contact.find({ owner: userId, _id: contactId }, favorite);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
  getFavorites,
};
