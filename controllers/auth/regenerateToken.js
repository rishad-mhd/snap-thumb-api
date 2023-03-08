const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../../lib/JWT");
const { Users } = require("../../models/user");

module.exports = async (req, res) => {
    const { refreshToken } = req.body;

    // verify refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // check if user exists
        const user = await Users.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // generate new access token
        const accessToken = generateAccessToken({ id: user._id });

        // send new access token to client
        res.json({ accessToken, success: true    });
    });
};





