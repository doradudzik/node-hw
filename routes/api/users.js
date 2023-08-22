const express = require("express");
const router = express.Router();
const auth = require("./authorization");

const crtlUser = require("../controller/users");

router.post("/signup", crtlUser.create);

router.post("/login", crtlUser.login);

router.get("/logout", auth, crtlUser.logout);

router.get("/current", auth, crtlUser.current);

router.patch("/subscription", auth, crtlUser.changeSubscription);

module.exports = router;
