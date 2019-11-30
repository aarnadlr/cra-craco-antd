import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Timeline from './components/Timeline';
import Home from './components/Home';

function App() {

  return (
    <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/timeline">
            <Timeline/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
