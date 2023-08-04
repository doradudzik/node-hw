const express = require("express");
const nanoid = require("nanoid");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const schema = require("../../utils/validation");

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const contacts = await listContacts();

    contacts.length > 0
      ? res.json({
          status: 200,
          data: {
            contacts,
          },
        })
      : res.status(404).json({
          status: 404,
          message: "Not found",
        });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);

    contactById
      ? res.json({
          status: 200,
          data: {
            contactById,
          },
        })
      : res.status(404).json({
          status: 404,
          message: "Not found",
        });
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const updatedContacts = await removeContact(contactId);
    updatedContacts
      ? res.json({
          status: 200,
          message: "Contact deleted",
        })
      : res.status(404).json({
          status: 404,
          message: "Not found",
        });
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const contact = await schema.validateAsync(req.body);
    if (!contact.name || !contact.email || !contact.phone) {
      throw new Error("missing required name/email/phone field");
    }
    const body = { id: nanoid(), ...contact };

    await addContact(body);

    res.status(201).json({
      status: 201,
      data: {
        body,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

router.put("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await schema.validateAsync(req.body);
    const body = { id: contactId, ...contact };

    await updateContact(contactId, body);
    updateContact
      ? res.status(200).json({
          status: 200,
          data: {
            body,
          },
        })
      : res.status(404).json({
          status: 404,
          message: "Not found",
        });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

module.exports = router;
