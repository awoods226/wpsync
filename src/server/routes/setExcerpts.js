const express = require('express');
const MovePage = require('../logic/movePage');

const router = express.Router();
router.get('/', (req, res) => {
  const move = new MovePage('https://crosspointnv18.elitewebscapes.com');
  move.setExcerpts().then((r) => {
    res.send({ status: 'complete' });
  });
});

module.exports = router;
