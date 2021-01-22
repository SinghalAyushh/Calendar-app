import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Example from './components/card';
import NewOrdersForm from './components/AddEvent';
import Dnd from './Dnd';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const Calendar = DragDropContext(HTML5Backend)(Dnd);

export class App extends Component {
  render() {
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
      
              <Switch>
                <Route exact path ="/">
                  <Calendar/>
                </Route>
                <Route exact path ="/add">
                  <NewOrdersForm/>
                </Route>
                <Route exact path ="/show">
                  <Example/>
                </Route>
                </Switch>
              
                </Router>
    )
  }
}

export default App
