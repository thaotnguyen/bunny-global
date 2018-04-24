import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Homepage from './components/Homepage';
import Roster from './components/Roster';
import Create from './components/Create';
import './App.css';
import './index.css';

const App = withRouter(({ location }) => (
  <div className="App">
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames='fade'
        timeout={250}
      >
        <Switch location={location}>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/roster' component={Roster} />
          <Route exact path='/create' component={Create} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  </div>
))

export default App;
