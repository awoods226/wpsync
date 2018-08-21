const express = require('express');
const MovePage = require('../logic/movePage');

const router = express.Router();
/* GET Reparent. */
router.get('/:from-:to', (req, res) => {
  const move = new MovePage('https://crosspointnv18.elitewebscapes.com');
  move.changeParent(req.params.from, req.params.to);
});

module.exports = router;
