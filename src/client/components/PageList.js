import React, { Component } from 'react';
import {
  Icon, Label, Menu, Table, Form, Segment, Button
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Models from '../../Models/Models';

class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  renderPages() {
    const { pages, onRowSelected, selectedPage } = this.props;
    const pageRows = [];
    const selectedPageID = selectedPage ? selectedPage.id : undefined;
    pages.map(p => pageRows.push(
      <Table.Row active={p.id === selectedPageID} onClick={() => onRowSelected(p)} key={p.id}>
        <Table.Cell>{p.id}</Table.Cell>
        <Table.Cell>{p.slug}</Table.Cell>
        <Table.Cell>{p.title.rendered}</Table.Cell>
        <Table.Cell>{p.parent}</Table.Cell>
      </Table.Row>
    ));
    return pageRows;
  }

  render() {
    const {
      selectedPage, onUpdateClicked, onDeleteChildrenClicked, onDeleteClicked
    } = this.props;
    return (
      <div>
        {selectedPage && (
          <Segment inverted>
            <Form inverted>
              <Form.Group widths="equal">
                <Form.Input fluid label="id" placeholder="id" value={selectedPage.id} />
                <Form.Input fluid label="slug" placeholder="slug" value={selectedPage.slug} />
                <Form.Input
                  fluid
                  label="title"
                  placeholder="title"
                  value={selectedPage.title.rendered}
                />
                <Form.Input fluid label="parent" placeholder="parent" value={selectedPage.parent} />
              </Form.Group>
              <Button onClick={() => onUpdateClicked()} color="blue" type="submit">
                Save
              </Button>
              <Button onClick={() => onDeleteClicked()} color="red" type="submit">
                Delete
              </Button>
              <Button onClick={() => onDeleteChildrenClicked()} color="orange" type="submit">
                Delete Children
              </Button>
            </Form>
          </Segment>
        )}
        <Table selectable celled>
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
      </div>
    );
  }
}

PageList.propTypes = {
  pages: PropTypes.arrayOf(Models.Page),
  onRowSelected: PropTypes.func.isRequired,
  onUpdateClicked: PropTypes.func,
  onDeleteClicked: PropTypes.func,
  onDeleteChildrenClicked: PropTypes.func,
  selectedPage: Models.Page
};

PageList.defaultProps = {
  pages: [],
  selectedPage: undefined,
  onUpdateClicked: undefined,
  onDeleteChildrenClicked: undefined,
  onDeleteClicked: undefined
};

export default PageList;
