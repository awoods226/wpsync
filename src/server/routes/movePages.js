const express = require('express');
const PageFetch = require('../logic/pageFetch');
const MovePage = require('../logic/movePage');

const router = express.Router();
/* GET old-pages listing. */
router.get('/', (req, res) => {
  const move = new MovePage('https://crosspointnv18.elitewebscapes.com');
  move.moveAllPages().then((d) => {
    const pageFetch = new PageFetch('crosspointnv18.elitewebscapes.com', 'newPages');
    const pages = pageFetch.getPagesFromDB();
    res.send(pages);
  });
});

module.exports = router;
