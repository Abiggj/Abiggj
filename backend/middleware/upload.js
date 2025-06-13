const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Image processing middleware
const processImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const { filename } = req.file;
    const outputPath = path.join(__dirname, '../public/uploads', filename);

    // Ensure uploads directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Process image with Sharp
    await sharp(req.file.buffer)
      .resize(1200, 800, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    // Add processed file info to request
    req.processedFile = {
      ...req.file,
      filename,
      path: outputPath,
      url: `/uploads/${filename}`
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload: upload.single('image'),
  processImage,
  uploadMultiple: upload.array('images', 10)
};
