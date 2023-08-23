const service = require("../../service/users");
const jwt = require("jsonwebtoken");

// const { registerSchema } = require("../../utils/validation.js");

require("dotenv").config();
const secret = process.env.SECRET;

const create = async (req, res) => {
  try {
    const body = req.body;
    // await registerSchema.validateAsync(body);

    const { email, password } = body;

    const existingUser = await service.getUser({ email });
    if (existingUser) {
      return res.json({
        status: "error",
        code: 409,
        data: "Conflict",
        message: "Email in use",
      });
    }

    const user = await service.createUser(body);
    user.setPassword(password);
    await user.save();

    res.json({
      status: "success",
      code: 201,
      data: {
        newUser: {
          email: user.email,
          subscription: user.subscription,
        },
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

    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
      data: { message: error.message },
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userByEmail = await service.getUser({ email });
    if (!userByEmail || !userByEmail.validPassword(password)) {
      return res.json({
        status: "error",
        code: 400,
        data: "Bad request",
        message: "Email or password is wrong",
      });
    }

    const payload = {
      id: userByEmail.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    const updatedUser = await service.updateUser({ email }, { token });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        updatedUser: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const updatedUser = await service.updateUser({ _id }, { token: null });
    if (!updatedUser) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    res.json({
      status: "success",
      code: 204,
      data: { message: "Logout" },
    });
  } catch (error) {
    console.log(error);
  }
};

const current = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const currentUser = await service.getUser({ _id });

    if (!currentUser) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        currentUser: {
          email: currentUser.email,
          subscription: currentUser.subscription,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const changeSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;

    if (!["starter", "pro", "business"].includes(subscription)) {
      return res.json({
        status: "error",
        code: 400,
        data: "Bad request",
        message: "Subscription may be only: 'starter' or 'pro' or 'business'",
      });
    }

    const updatedUser = await service.updateUser(
      { _id },
      { subscription: subscription }
    );
    if (!updatedUser) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    res.json({
      status: "success",
      code: 204,
      data: {
        updatedUser: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
        },
      },
    });
  } catch (error) {
    console.log(error);
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
  }
};

module.exports = {
  create,
  login,
  logout,
  current,
  changeSubscription,
};
