const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contactsFile = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contactsFile);
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter((contact) => contact.id === contactId);
    return contactById;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    contacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const selectedContact = contacts.find(
      (contact) => contact.id === contactId
    );
    if (selectedContact) {
      selectedContact.name = body.name;
      selectedContact.email = body.email;
      selectedContact.phone = body.phone;

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return selectedContact;
    } else {
      throw new Error("Contact not found");
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
