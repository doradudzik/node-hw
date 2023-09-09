const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const user = new Schema(
  {
    email: {
      type: String,
      match: [
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        "Enter a valid e-mail address",
      ],
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
        "Password must contain: at least 6 characters, at least one numeric digit, one uppercase and one lowercase letter",
      ],
      minLength: [6, "Password must contain at least 6 characters"],
      trim: true,
    },
    avatarURL: {
      type: String,
      required: [true, "Avatar is required"],
    },
    publicId: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      enum: {
        values: ["starter", "pro", "business"],
        message: "Subscription may be only: 'starter' or 'pro' or 'business'",
      },
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", user);
module.exports = User;
