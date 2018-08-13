import '../app.css';
import { Container, Image, Menu } from 'semantic-ui-react';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ReactImage from '../react.png';

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            <Image size="mini" src={ReactImage} style={{ marginRight: '1.5em' }} />
            {'Word Press Sync'}
          </Menu.Item>
          <Menu.Item as="span">
            <NavLink to="/" activeClassName="hurray">
              {'Home'}
            </NavLink>
          </Menu.Item>
          <Menu.Item as="span">
            <NavLink to="/oldpages" activeClassName="hurray">
              {'Old Pages'}
            </NavLink>
          </Menu.Item>
          <Menu.Item as="span">
            <NavLink to="/newpages" activeClassName="hurray">
              {'New Pages'}
            </NavLink>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default NavHeader;
