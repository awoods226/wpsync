const express = require('express');
const PageFetch = require('../logic/pageFetch');

const router = express.Router();

/* GET old-pages listing. */
router.get('/', (req, res) => {
  const pageFetch = new PageFetch('yourcrosspointnv.org');
  pageFetch.retrievePages().then((d) => {
    debugger;
    const pages = pageFetch.getPagesFromDB();
    res.send(pages);
  });
});

module.exports = router;
