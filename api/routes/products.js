const express = require('express');
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../middleware/cheeck-auth');

const productController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get('/', productController.product_all);

router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  productController.create_product
);

router.get('/:productId', productController.product_get);

router.patch('/:productId', productController.product_update);

router.delete('/:productId', checkAuth, productController.product_delete);
module.exports = router;
