const Image = require("../../models/image")

module.exports = (req, res) => {
    let id = req.params.id
    Image.findById(id).then((image) => {
        res.json({ image })
    }).catch((e) => {
        res.status(404).json({ error: e, message: "Thumbnail not found" })
    })
}