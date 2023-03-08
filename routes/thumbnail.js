var express = require('express');
const multer = require('multer');
const byId = require('../controllers/thumbnail/byId');
const create = require('../controllers/thumbnail/create');
const list = require('../controllers/thumbnail/list');
const deleteThumbnail = require('../controllers/thumbnail/deleteThumbnail');
const { body } = require('express-validator');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

var router = express.Router();

router.route('/')
    .post(upload.single('image'),body('sizes').isArray(), create)
    .get(list);

    router.route('/:id').get(byId).delete(deleteThumbnail)

module.exports = router;