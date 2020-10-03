import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Countries from './pages/Countries';
import CountryDetails from './pages/Countries/Details';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/details/:country" component={CountryDetails} />
        <Route exact path="/" component={Countries} />
      </Switch>
    </Router>
  );
}
