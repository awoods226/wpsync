const superagent = require('superagent');
require('dotenv').config();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');

class MovePage {
  constructor(endPointUrl, page) {
    this.page = page;
    this.endpoint = endPointUrl;
    this.credentials = {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    };
    this.db = low(adapter);
  }

  movePage(page) {
    // first look for page in the db
    return new Promise((resolve, reject) => {
      const dbFound = this.db
        .get('newPages')
        .find({ slug: page.slug })
        .value();
      if (dbFound) {
        return resolve(dbFound);
      }
      resolve(
        this.doesPageExist(page)
          .then((res) => {
            if (res.body.length === 0) {
              this.createPage(page);
            }
            return res;
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          })
      );
    });
  }

  doesPageExist(page) {
    // strip old domain
    return superagent
      .get(`${this.endpoint}/wp-json/wp/v2/pages?slug=${page.slug}`)
      .auth(this.credentials.username, this.credentials.password);
  }

  createPage(pg) {
    let req;
    try {
      console.log(`Creating page ${pg.title.rendered}`);
      const page = {
        title: pg.title.rendered,
        slug: pg.slug,
        status: pg.status,
        menu_order: pg.menu_order,
        meta: pg.meta
      };
      if (pg.parent !== 0) {
        // get pages parent ID from the db
        const oldParentRec = this.db
          .get('pages')
          .find({ id: pg.parent })
          .value();
        const parent = this.db
          .get('newPages')
          .find({ slug: oldParentRec.slug })
          .value();

        if (!parent) {
          throw Error('Cannot locate parent in db');
        }
        page.parent = parent.id;
      }

      req = superagent
        .post(`${this.endpoint}/wp-json/wp/v2/pages`)
        .auth(this.credentials.username, this.credentials.password)
        .send(page)
        .then((res) => {
          this.db
            .get('newPages')
            .push(res.body)
            .write();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    return req;
  }

  getOldPageFromDb(slug) {
    return this.db
      .get('pages')
      .find({ slug })
      .value();
  }

  processNonRootPage(page) {
    const urlArray = page.link.split('/');
    urlArray.pop();
    const pageSlugs = urlArray.slice(3);
    // create all of our promises
    const pages = pageSlugs.map(ps => this.getOldPageFromDb(ps));
    const promises = pages.map(p => this.movePage(p));
    return Promise.all(promises).then((r) => {
      console.log(r);
    });
  }

  moveAllPages() {
    const oldPages = this.db.get('pages').value();
    return Promise.all(
      oldPages.map((p) => {
        if (p.parent !== 0) {
          this.processNonRootPage(p);
        } else {
          this.movePage(p);
        }
      })
    );
  }
}

module.exports = MovePage;
