const express = require('express');
const router = express.Router();
const photo = require('../controllers/photo.controller');

router.get('/', photo.getPhotos);
router.post('/', photo.createPhoto);
router.get('/:id', photo.getPhoto);
router.put('/:id', photo.editPhoto);
router.delete('/:id', photo.deletePhoto);

module.exports = router;