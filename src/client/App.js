import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NavHeader from './components/NavHeader';
import OldPages from './components/OldPages';
import NewPages from './components/NewPages';

import './app.css';

const App = () => (
  <div>
    <NavHeader />
    <Switch>
      {/* these are good */}
      <Route exact path="/" component={Home} />
      <Route path="/oldpages" render={props => <OldPages {...props} />} />
      <Route path="/newpages" render={props => <NewPages {...props} />} />
    </Switch>
  </div>
);

export default App;
