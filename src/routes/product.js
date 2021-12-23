const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.fetch);

router.get('/:id', ProductController.find);

router.post('/', ProductController.create);

router.put('/:id', ProductController.put);

router.delete('/:id', ProductController.delete);

module.exports = router;
