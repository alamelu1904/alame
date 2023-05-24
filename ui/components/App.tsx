import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} /> {/* Set LoginPage as the initial component */}
        <Route path="/dashboard" component={DashboardPage} />
      </Switch>
    </Router>
  );
};

export default App;
