const express = require('express');
const controller = require('../controllers/book.controller');

const router = express.Router();

router.get('/',controller.bookGet);

router.post('/create',controller.bookPost);

router.put('/edit',controller.bookPut);

router.delete('/delete',controller.bookDelete);

router.get('/:id',controller.bookGetById);

module.exports = router;