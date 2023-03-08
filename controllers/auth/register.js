const express = require("express");
const { validationResult } = require("express-validator");
const { generateAccessToken, generateRefreshToken } = require("../../lib/JWT");
const { Users } = require("../../models/user");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res) {
  let { email, password, username } = req.body;

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  let user = await Users.findOne({ email });
  if (user) {
    return res.status(403).json({ message: "User already exist" });
  }

  let newUser = new Users({ username, email, password, status: 1 });
  // newUser.id = uuidV4();
  newUser.setPassword(password);

  newUser.save().then((User) => {
    const id = User.toJSON()._id
    const accessToken = generateAccessToken({ id });
    const refreshToken = generateRefreshToken({ id });
    return res
      .status(201)
      .json({ accessToken, refreshToken });
  }).catch((e) => {
    console.log(e);
    return res
      .status(400)
      .json({ error: e, message: "User registration failed" })
  });
};
