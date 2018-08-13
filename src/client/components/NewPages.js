import React, { Component } from 'react';
import '../app.css';
import {
  Container, Divider, Header, Segment, Button, Icon, Loader
} from 'semantic-ui-react';
import PageList from './PageList';

class NewPages extends Component {
  constructor(props) {
    super(props);
    this.state = { pageList: [], fetched: false, isFetching: false };
  }

  componentDidMount() {
    fetch('http://localhost:8081/displayNewPages')
      .then(res => res.json())
      .then((pages) => {
        this.setState({ pageList: pages });
      });
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
    fetch('http://localhost:8081/fetchNewPages')
      .then(res => res.json())
      .then((pages) => {
        this.setState({ pageList: pages });
      });
  }

  render() {
    const { pageList, fetched, fetching } = this.state;
    return (
      <div>
        <Container>
          <Header as="h1">New Pages</Header>
          <Segment vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
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
          </Segment>
          <Segment vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
            {pageList.length && <span>{`Page Count: ${pageList.length}`}</span>}
            {pageList.length && <PageList pages={pageList} />}
            {fetching && <Loader />}
          </Segment>
        </Container>
      </div>
    );
  }
}

export default NewPages;
