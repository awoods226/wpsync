import React, { Component } from 'react';
import '../app.css';
import {
  Container, Header, Segment, Button, Icon, Loader, Form, Select
} from 'semantic-ui-react';
import _ from 'lodash';
import PageList from './PageList';

class NewPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: [],
      fetched: false,
      isFetching: false,
      selectedPage: undefined,
      displayReparent: false,
      parentFrom: undefined,
      parentTo: undefined
    };
  }

  componentDidMount() {
    // fetch pages from db
    fetch('http://localhost:8081/displayNewPages')
      .then(res => res.json())
      .then((pages) => {
        this.setState({ pageList: pages });
      });
  }

  getParents() {
    const { pageList } = this.state;
    return _(pageList)
      .map('parent')
      .uniq()
      .sortBy()
      .map(p => ({
        key: p,
        text: p,
        value: p
      }))
      .value();
  }

  handleChange(e, name, value) {
    this.setState({ [name]: value.value });
  }

  movePages() {
    this.setState({ fetching: true });
    fetch('http://localhost:8081/movePages')
      .then(res => res.json())
      .then((pages) => {
        this.setState({ pageList: pages, fetched: true, fetching: false });
      });
  }

  fetchPages() {
    // fetch pages from wordpress
    fetch('http://localhost:8081/fetchNewPages')
      .then(res => res.json())
      .then((pages) => {
        this.setState({ pageList: pages });
      });
  }

  handleReparentClick() {
    this.setState({ displayReparent: true });
  }

  handlePageSelect(page) {
    this.setState({ selectedPage: page });
  }

  handleReparentSave() {
    const { parentFrom, parentTo } = this.state;
    fetch(`http://localhost:8081/reparent/${parentFrom}-${parentTo}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({ displayReparent: false });
      });
    console.log(this.state);
  }

  handleSetExcerptClick() {
    this.setState({ fetching: true });
    fetch('http://localhost:8081/setExcerpts')
      .then(res => res.json())
      .then((res) => {
        this.setState({ fetching: false });
      });
  }

  render() {
    const {
      pageList,
      fetched,
      fetching,
      selectedPage,
      displayReparent,
      parentFrom,
      parentTo
    } = this.state;
    return (
      <div>
        <Container>
          <Header as="h1">New Pages</Header>
          <Segment vertical style={{ margin: '.25em 0em 0em', padding: '1em 0em' }}>
            <Button animated onClick={() => this.movePages()} disabled={fetching}>
              <Button.Content visible>Move Pages</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
            <Button animated onClick={() => this.fetchPages()}>
              <Button.Content visible>Fetch Pages</Button.Content>
              <Button.Content hidden>
                <Icon name="redo" />
              </Button.Content>
            </Button>
            <Button animated onClick={() => this.handleReparentClick()}>
              <Button.Content visible>Reparent</Button.Content>
              <Button.Content hidden>
                <Icon name="code branch" />
              </Button.Content>
            </Button>
            <Button animated onClick={() => this.handleSetExcerptClick()} disabled={fetching}>
              <Button.Content visible>Set Excerpts</Button.Content>
              <Button.Content hidden>
                <Icon name="gem" />
              </Button.Content>
            </Button>
          </Segment>
          {displayReparent && (
            <Segment inverted>
              <Select
                placeholder="Select From Parent"
                name="parentFrom"
                options={this.getParents()}
                onChange={(e, d) => this.handleChange(e, 'parentFrom', d)}
                value={parentFrom}
              />
              <Select
                placeholder="Select To Parent"
                options={this.getParents()}
                onChange={(e, d) => this.handleChange(e, 'parentTo', d)}
                value={parentTo}
                name="parentTo"
              />
              <Button onClick={() => this.handleReparentSave()} color="blue" type="submit">
                Save
              </Button>
            </Segment>
          )}
          <Segment vertical style={{ margin: '.5em 0em 0em', padding: '1em 0em' }}>
            {pageList.length && <span>{`Page Count: ${pageList.length}`}</span>}
            {pageList.length && (
              <PageList
                pages={pageList}
                onRowSelected={i => this.handlePageSelect(i)}
                selectedPage={selectedPage}
              />
            )}
            {fetching && <Loader />}
          </Segment>
        </Container>
      </div>
    );
  }
}

export default NewPages;
