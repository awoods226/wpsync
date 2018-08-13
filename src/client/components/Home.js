import React, { Component } from 'react';
import '../app.css';
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment
} from 'semantic-ui-react';
import ReactImage from '../react.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { pages: null };
  }

  componentDidMount() {
    // fetch('http://localhost:8081/getOldPages')
    //   .then(res => res.json())
    //   .then((pages) => {});
  }

  render() {
    const { pages } = this.state;
    return (
      <div>
        <Container text style={{ marginTop: '7em' }}>
          <Header as="h1">
            {'Wordpress Page Sync Tool'}
          </Header>
          <p>
            {'This is a basic fixed menu template using fixed size containers.'}
          </p>
          <p>
            {
              'A text container is used for the main container, which is useful for single column layouts.'
            }
          </p>
        </Container>

        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Group 1" />
                  <List link inverted />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Group 2" />
                  <List link inverted />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Group 3" />
                  <List link inverted />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Footer Header" />
                  <p>
                    {
                      'Extra space for a call to action inside the footer that could help re-engage users.'
                    }
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider inverted section />
            <Image centered size="mini" src={ReactImage} />
            <List horizontal inverted divided link>
              <List.Item as="a" href="#">
                {'Site Map'}
              </List.Item>
              <List.Item as="a" href="#">
                {'Contact Us'}
              </List.Item>
              <List.Item as="a" href="#">
                {'Terms and Conditions'}
              </List.Item>
              <List.Item as="a" href="#">
                {'Privacy Policy'}
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}
