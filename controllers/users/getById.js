const express = require("express");
const { Users } = require("../../models/user");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 */
module.exports = function (req, res) {
    const id = req.user.id
    Users.findById(id, { hash: 0, salt: 0 }).then((user) => {
        return res.json(user)
    }).catch((e) => {
        return res.status(404).json({ message: 'User not found' })
    })
};
