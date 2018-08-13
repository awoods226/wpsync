const express = require('express');
const PageFetch = require('../logic/pageFetch');

const router = express.Router();

/* GET old-pages listing. */
router.get('/', (req, res) => {
  const pageFetch = new PageFetch();
  const pages = pageFetch.getPagesFromDB();
  res.send(JSON.stringify(pages));
});

module.exports = router;
