const service = require("../../service/contacts.js");

const get = async (_, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (err) {
    console.err(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contactById = await service.getContactById(contactId);
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: contactById,
      },
    });
  } catch (err) {
    console.err(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const results = await service.removeContact(contactId);
    results
      ? res.json({
          status: 200,
          message: "Contact deleted",
        })
      : res.status(404).json({
          status: 404,
          message: `Not found: contact with id: ${contactId}`,
        });
  } catch (err) {
    console.err(err.message);
    next(err);
  }
};
const create = async (req, res) => {
  try {
    const body = req.body;
    const results = await service.createContact(body);

    res.json({
      status: "success",
      code: 201,
      data: {
        contact: results,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {};

      for (const key in error.errors) {
        validationErrors[key] = error.errors[key].message;
      }

      return res.status(400).json({
        status: 400,
        message: "Validation failed",
        errors: validationErrors,
      });
    }
    res.status(500).send("Something went wrong");
  }
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
    const updatedContact = await service.updateContact(contactId, body);
    updatedContact
      ? res.status(200).json({
          status: 200,
          data: {
            updatedContact,
          },
        })
      : res.status(404).json({
          status: 404,
          message: "Not found",
        });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
const updateStatusFormat = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const body = Object.hasOwn(req.body, "favorite") ? req.body : null;
  try {
    if (body) {
      const contact = await service.updateContact(contactId, {
        favorite: favorite,
      });
      res.status(200).json({
        status: 200,
        data: {
          contact,
        },
      });
    } else if (!body) {
      res.status(400).json({
        status: 400,
        message: "missing field favorite",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
module.exports = {
  get,
  getById,
  remove,
  create,
  update,
  updateStatusFormat,
};

// Alternatywna wersja updateStatusFormat, która automatycznie zamienia wartość "favorite" na przeciwną. Nie wymaga przesyłania body:
// const updateStatusFormat = async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const currentContact = await service.getContactById(contactId);
//     const updatedFavorite = !currentContact.favorite;
//     const contact = await service.updateContact(contactId, {
//       favorite: updatedFavorite,
//     });
//     contact
//       ? res.status(200).json({
//           status: 200,
//           data: {
//             contact,
//           },
//         })
//       : res.status(404).json({
//           status: 404,
//           message: "Not found",
//         });
//   } catch (err) {
//     res.status(400).json({
//       status: 400,
//       message: err.message,
//     });
//   }
// };
