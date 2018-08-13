import React, { Component } from 'react';
import '../app.css';
import {
  Container, Divider, Grid, Header, Image, List, Segment
} from 'semantic-ui-react';
import ReactImage from '../react.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { pages: null };
  }

  componentDidMount() {}

  render() {
    const { pages } = this.state;
    return (
      <div>
        <Container className="home-container" text style={{ marginTop: '7em' }}>
          <Header as="h1">Wordpress Page Sync Tool</Header>
          <p>This tool can move content from one Wordpress site to another</p>
        </Container>
      </div>
    );
  }
}
