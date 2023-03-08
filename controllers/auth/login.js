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
module.exports = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (user.validPassword(req.body.password)) {
          const id = user.toJSON()._id
          const accessToken = generateAccessToken({ id });
          const refreshToken = generateRefreshToken({ id });
          return res.status(201).json({
            message: "User Logged In successfully",
            accessToken,
            refreshToken
          });
        } else {
          return res.status(400).json({
            message: "Incorrect passord",
          });
        }
      } else {
        res.status(401).json({ message: "User doesn't exists" });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(403).json({ message: "Login failed" });
    });
};
