const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
      match: [/^[a-zA-Z]{3,30}$/, "Name must contain only letters."],
      minLength: 3,
      maxLength: 30,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      match: [
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        "Enter a valid e-mail address",
      ],
    },
    phone: {
      type: String,
      minLength: 3,
      maxLength: 16,
      match: [/^\d{3,16}$/, "Phone must contain only numbers."],
      trim: true,
      required: [true, "Phone field is required"],
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
