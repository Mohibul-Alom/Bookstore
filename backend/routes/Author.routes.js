const express = require('express');
const controller = require('../controllers/author.controller');


const router = express.Router();

router.get('/',controller.authorGet);

router.post('/create',controller.authorPost);

router.put('/edit',controller.authorPut);

router.delete('/delete',controller.authorDelete);

module.exports = router;