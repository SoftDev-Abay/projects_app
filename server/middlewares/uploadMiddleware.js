const multer = require("multer");
const fs = require("fs");
const path = require("path");
// Configure multer storage and file name

const uploadImage = multer({ dest: "images/" });

const storageAttachments = multer.diskStorage({
  destination: (req, file, cb) => {
    const attachmentsPath = path.join(__dirname, "../attachments");
    cb(null, attachmentsPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadAttachment = multer({ storage: storageAttachments });

// Custom file upload middleware
const uploadMiddleware = (req, res, next) => {
  // Use multer upload instance
  uploadAttachment.array("files", 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Retrieve uploaded files
    const files = req.files;
    const errors = [];

    // Validate file types and sizes
    files.forEach((file) => {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return res.status(400).json({ errors });
    }

    // Attach files to the request object
    req.files = files;

    // Proceed to the next middleware or route handler
    next();
  });
};

const uploadImageMiddleware = (req, res, next) => {
  uploadImage.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Retrieve uploaded files
    const file = req.file;
    const errors = [];

    // Validate file types and sizes
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      errors.push(`Invalid file type: ${file.originalname}`);
    }

    if (file.size > maxSize) {
      errors.push(`File too large: ${file.originalname}`);
    }

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      fs.unlinkSync(file.path);

      return res.status(400).json({ errors });
    }

    // Attach files to the request object
    req.file = file;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = uploadMiddleware;
module.exports = uploadImageMiddleware;
