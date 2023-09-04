const express = require("express");
const router = express.Router();
const auth = require("./authorization");
const { upload } = require("./uploadAvatar.js");

const crtlUser = require("../controller/users");

router.post("/signup", crtlUser.create);

router.post("/login", crtlUser.login);

router.get("/logout", auth, crtlUser.logout);

router.get("/current", auth, crtlUser.current);

router.patch("/subscription", auth, crtlUser.changeSubscription);

router.patch("/avatars", auth, upload.single("avatar"), crtlUser.updateAvatar);

module.exports = router;
