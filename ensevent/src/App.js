import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Event from './screen/Event';


class App extends Component {
  render() {
    return (

          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/event" />} />
              <Route exact path='/event' component={Event} />
            </Switch>
          </BrowserRouter>
    );
  }
}



export default App;
