const Image = require("../../models/image")

module.exports = async (req, res) => {
    let userId = req.user.id
    let currentPage = parseInt(req.query.currentPage)
    let pageSize = parseInt(req.query.pageSize)
    try {
        let total = await Image.countDocuments({ userId, status: { $ne: 'deleted' } })
        let images = await Image.find({ userId, status: { $ne: 'deleted' } })
            .skip(currentPage * pageSize)
            .limit(pageSize)

        if (images.length) {
            return res.json({ images, total })
        } else {
            return res.status(404).json({ message: 'No data found' })
        }

    } catch (e) {
        res.sendStatus(500)
    }

}