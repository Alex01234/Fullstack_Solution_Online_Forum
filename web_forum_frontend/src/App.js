import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ThreadList from './ThreadList';
import ThreadEdit from './ThreadEdit';
import PostList from './PostList';
import PostEdit from './PostEdit';
import { Redirect } from 'react-router';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Redirect exact from="/" to="/api/threads" />
            <Route path='/api/threads' exact={true} component={ThreadList}/>
            <Route path='/api/thread/:id' component={ThreadEdit}/>
            <Route path='/api/posts/:id' component={PostList}/>
            <Route path='/api/post/:id' component={PostEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;