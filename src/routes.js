import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Countries from './pages/Countries';
import Add from './pages/Countries/Add';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/dedao" component={Add} />
        <Route exact path="/" component={Countries} />
      </Switch>
    </Router>
  );
}
