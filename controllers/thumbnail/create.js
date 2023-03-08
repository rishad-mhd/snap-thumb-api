const { validationResult } = require("express-validator");
const sharp = require("sharp");
const Image = require("../../models/image");

module.exports = async function (req, res) {
    try {
        const { filename, originalname } = req.file;
        let userId = req.user.id
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const sizes = req.body.sizes?.sort((a, b) => parseInt(a) - parseInt(b));
        const originalUrl = `${process.env.UPLOAD_URL}/uploads/${filename}`;
        const image = new Image({ filename: originalname, originalUrl, userId });
        await image.save();

        // Generate thumbnails
        const promises = sizes.map(async (size) => {
            size = parseInt(size)
            const thumbnailFilename = `${size}_${filename}`;
            const thumbnailPath = `thumbnails/${thumbnailFilename}`;
            const thumbnailUrl = `${process.env.UPLOAD_URL}/${thumbnailPath}`;
            await sharp(req.file.path).resize(size).toFile(`public/${thumbnailPath}`);
            return { size, url: thumbnailUrl };
        });
        const thumbnailUrls = await Promise.all(promises);

        // Update the image with thumbnail URLs
        image.thumbnailUrls = thumbnailUrls;
        await image.save();

        res.status(201).json(image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}