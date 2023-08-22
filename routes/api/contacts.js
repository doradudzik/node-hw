const express = require("express");
const router = express.Router();

const auth = require("./authorization.js");
const crtlContact = require("../controller/index.js");

router.get("/", auth, crtlContact.get);

router.get("/:contactId", auth, crtlContact.getById);

router.delete("/:contactId", auth, crtlContact.remove);

router.post("/", auth, crtlContact.create);

router.put("/:contactId", auth, crtlContact.update);

router.patch("/:contactId/favorite", auth, crtlContact.updateStatusFormat);

// router.get("/?favorite=true", auth, crtlContact.getAllFavorites);

module.exports = router;
