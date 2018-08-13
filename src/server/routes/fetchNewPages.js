const express = require('express');
const PageFetch = require('../logic/pageFetch');

const router = express.Router();

/* GET old-pages listing. */
router.get('/', (req, res) => {
  const pageFetch = new PageFetch('crosspointnv18.elitewebscapes.com', 'newPages');
  pageFetch.retrievePages().then((d) => {
    const pages = pageFetch.getPagesFromDB();
    res.send(pages);
  });
});

module.exports = router;
