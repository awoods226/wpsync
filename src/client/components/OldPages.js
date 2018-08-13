import React, { Component } from 'react';
import '../app.css';
import {
  Container, Divider, Header, Segment, Button, Icon, Loader
} from 'semantic-ui-react';
import PageList from './PageList';

class OldPages extends Component {
  constructor(props) {
    super(props);
    this.state = { pageList: [], fetched: false, isFetching: false };
  }

  componentDidMount() {
    fetch('http://localhost:8081/displayOldPages')
      .then(res => res.json())
      .then((pages) => {
        this.setState({ pageList: pages });
      });
  }

  fetchPages() {
    this.setState({ fetching: true });
    fetch('http://localhost:8081/fetchOldPages')
      .then(res => res.json())
      .then((pages) => {
        this.setState({ pageList: pages, fetched: true, fetching: false });
      });
  }

  render() {
    const { pageList, fetched, fetching } = this.state;
    return (
      <div>
        <Container>
          <Header as="h1">Old Pages from DB</Header>
          <Segment vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
            <Button animated onClick={() => this.fetchPages()} disabled={fetched || fetching}>
              <Button.Content visible>Retrieve Pages</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
            <Divider />
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

export default OldPages;
