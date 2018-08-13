import PropTypes from 'prop-types';

const Page = PropTypes.shape({
  date: PropTypes.string,
  date_gmt: PropTypes.date_gmt,
  slug: PropTypes.string,
  status: PropTypes.string,
  password: PropTypes.string,
  parent: PropTypes.number,
  title: PropTypes.any,
  content: PropTypes.any,
  author: PropTypes.any,
  excerpt: PropTypes.any,
  featured_media: PropTypes.number,
  comment_status: PropTypes.string,
  ping_status: PropTypes.string,
  menu_order: PropTypes.number,
  meta: PropTypes.any,
  template: PropTypes.string
});

module.exports = {
  Page
};
