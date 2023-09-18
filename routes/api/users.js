const express = require("express");
const router = express.Router();
const auth = require("./authorization");
const { upload } = require("./uploadAvatar.js");

const ctrlUser = require("../controller/users");

router.post("/signup", ctrlUser.create);

router.post("/login", ctrlUser.login);

router.get("/logout", auth, ctrlUser.logout);

router.get("/current", auth, ctrlUser.current);

router.patch("/subscription", auth, ctrlUser.changeSubscription);

router.patch("/avatars", auth, upload.single("avatar"), ctrlUser.updateAvatar);

router.get("/verify/:verificationToken", ctrlUser.verifyEmail);

router.post("/verify", ctrlUser.reVerifyEmail);

module.exports = router;
