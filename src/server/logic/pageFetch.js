const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const WPAPI = require('wpapi');

const adapter = new FileSync('db.json');

class PageFetch {
  constructor(endPointUrl, dbsetName) {
    this.wp = new WPAPI({
      endpoint: `${endPointUrl}/wp-json`,
      username: process.env.OLD_NV_USERNAME,
      password: process.env.OLD_NV_PASSWORD
    });
    this.pageCount = 0;
    this.siteCount = 0;
    this.db = low(adapter);
    this.dbsetName = dbsetName;
  }

  retrievePages() {
    this.db.defaults({ pages: [] }).write();
    return new Promise((resolve, reject) => {
      this.wp
        .pages()
        .perPage(30)
        .get()
        .then((data) => {
          console.log('getting page 1');
          data.map((p) => {
            this.savePage(p);
            this.siteCount++;
          });
          console.log(this.siteCount);
          this.pageCount = parseInt(data._paging.totalPages);
          console.log(`total pages ${this.pageCount}`);
          // start index at 2 since we already fetched the first page
          for (let i = 1; i <= this.pageCount; i++) {
            console.log(`getting page ${i}`);
            this.getPage(i);
          }
          resolve('done');
        });
    });
  }

  getPage(page) {
    this.wp
      .pages()
      .perPage(30)
      .page(page)
      .get()
      .then((data) => {
        console.log(`Page ${page} has pagecount: ${data.length}`);
        data.map((p) => {
          this.savePage(p);
          this.siteCount++;
        });
        console.log(this.siteCount);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  savePage(page) {
    try {
      // dont save page if it already exists
      const exists = this.db
        .get(this.dbsetName)
        .find({ id: page.id })
        .value();
      if (exists) {
        this.db
          .get(this.dbsetName)
          .find({ id: page.id })
          .assign({ ...page })
          .write();
      } else {
        this.db
          .get(this.dbsetName)
          .push({ ...page })
          .write();
      }
    } catch (error) {
      console.log(error);
    }
  }

  getPageCountFromDB() {
    return this.db
      .get(this.dbsetName)
      .size()
      .value();
  }

  getPagesFromDB() {
    return this.db.get(this.dbsetName).value();
  }
}

module.exports = PageFetch;
