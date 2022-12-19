const { BadRequest, Unauthorized } = require("../lib/errors");
const { Op } = require("sequelize");
const { User } = require("../models");
const { hash, getJwtToken } = require("../utils/cipher");
const response = require("../utils/response");

/**
 * Get token response after login or signup.
 *
 * @param {Object} user User data.
 *
 * @return {Object} Object contain the token.
 */
const getTokenResponse = ({ id, email }) => ({
  token: getJwtToken({
    id,
    email,
  }),
});

/**
 * Create new account.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const register = async (req, res) => {
  const { email, password, username } = req.body;

  const dbUser = await User.findOne({
    where: {
      [Op.or]: [
        {
          email: email.toLowerCase(),
        },
        {
          username,
        },
      ],
    },
  });

  if (dbUser) {
    throw new BadRequest("Email or Username already in use");
  }

  const newUser = await User.create({
    ...req.body,
    email: email.toLowerCase(),
    password: hash(password),
  });

  res
    .status(201)
    .json(response({ code: 201, data: getTokenResponse(newUser) }));
};

/**
 * Login user.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const login = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email && !username) {
    throw new BadRequest("You need to use email or username to login");
  }

  const filter = email ? { email: email.toLowerCase() } : { username };

  const user = await User.findOne({
    where: filter,
  });

  if (!user) {
    throw new Unauthorized("Invalid email or username");
  }
  if (hash(password) !== user.password) {
    throw new Unauthorized("Invalid email or password");
  }

  res.status(201).json(response({ code: 201, data: getTokenResponse(user) }));
};

/**
 * Get user data.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getUserData = async (req, res) => {
  const { id } = req.user;

  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.status(200).json(response({ code: 200, data: user }));
};

/**
 * Delete user.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteUser = async (req, res) => {
  const { id } = req.user;

  await User.destroy({ where: { id } });

  res.status(204).json(response({ code: 204 }));
};

/**
 * Update user.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateUser = async (req, res) => {
  const { id } = req.user;
  const { password, username, email, firstName, lastName } = req.body;

  const updatedData = {};

  const user = await User.findByPk(id);

  if (email && email.toLowerCase() !== user.email) {
    const dbUser = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (dbUser) {
      throw new BadRequest("Email already in use");
    } else {
      updatedData.email = email.toLowerCase();
    }
  }

  if (username && username !== user.username) {
    const dbUser = await User.findOne({
      where: {
        username,
      },
    });

    if (dbUser) {
      throw new BadRequest("Username already in use");
    } else {
      updatedData.username = username;
    }
  }

  if (password && hash(password) !== user.password) {
    updatedData.password = hash(password);
  }

  if(firstName) updatedData.firstName = firstName;

  if(lastName) updatedData.lastName = firstName;

  const updatedUser = await user.update(
    { ...updatedData, updatedAt: new Date() },
    { attributes: { exclude: ["password"] } }
  );

  res.status(202).json(response({ code: 202, data: updatedUser }));
};

module.exports = {
  register,
  login,
  getUserData,
  deleteUser,
  updateUser,
};
