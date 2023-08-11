const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minLength: 3,
      maxLength: 30,
      match: [/^[a-zA-Z]{3,30}$/, "Name must contain only letters."],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      minLength: 3,
      maxLength: 16,
      match: [/^\d{3,16}$/, "Phone must contain only numbers."],
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contact);
module.exports = Contact;
