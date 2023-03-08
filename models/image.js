const { default: mongoose } = require("mongoose");

const ImageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    originalUrl: { type: String, required: true },
    thumbnailUrls: [{ size: Number, url: String }],
    userId: { type: String, required: true },
    status: { type: String, default: 'active', enum: ['active', "inactive", "deleted"] }
}, { timestamps: true });

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image