const express = require('express');
const router = express.Router();
const hangmanController = require('../controllers/game');

router.get('/', hangmanController.getHangman);
router.post('/start', hangmanController.startGame);
router.post('/guess', hangmanController.makeGuess);

exports.routes = router;