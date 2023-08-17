const express = require("express");
const router = express.Router();

const crtlContact = require("../controller/index.js");

router.get("/", crtlContact.get);

router.get("/:contactId", crtlContact.getById);

router.delete("/:contactId", crtlContact.remove);

router.post("/", crtlContact.create);

router.put("/:contactId", crtlContact.update);

router.patch("/:contactId/favorite", crtlContact.updateStatusFormat);

module.exports = router;
