import React, { Component } from 'react';
import {
  Icon, Label, Menu, Table
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Models from '../../Models/Models';

class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPages() {
    const { pages } = this.props;
    const pageRows = [];
    pages.map(p => pageRows.push(
      <Table.Row>
        <Table.Cell>{p.id}</Table.Cell>
        <Table.Cell>{p.slug}</Table.Cell>
        <Table.Cell>{p.title.rendered}</Table.Cell>
        <Table.Cell>{p.parent}</Table.Cell>
      </Table.Row>
    ));
    return pageRows;
  }

  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Slug</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Parent</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderPages()}</Table.Body>
      </Table>
    );
  }
}

PageList.propTypes = {
  pages: PropTypes.arrayOf(Models.Page)
};

PageList.defaultProps = {
  pages: []
};

export default PageList;
