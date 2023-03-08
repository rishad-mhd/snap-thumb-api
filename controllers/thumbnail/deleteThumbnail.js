const Image = require("../../models/image")

module.exports = (req, res) => {
    let id = req.params.id
    Image.findByIdAndUpdate(id, { $set: { status: 'deleted' } }).then((response) => {
        res.json({ message:'Thumbnail deleted successfully' })
    }).catch((e) => {
        res.status(404).json({ error: e, message: "Failed to delete thumbnail" })
    })
}