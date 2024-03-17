const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { uploadFileController, getFileController } = require('../Controllers/FileController');


// Configure Multer for Files...
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        // Check if the upload directory exists, create it if not
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const upload = multer({ storage });



// File upload routes....
router.post('/uploadFile', upload.single('file'), uploadFileController);

// File get routes...
router.get('/getFile/:fileId', getFileController);




module.exports = router;
