import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from '../../components/PrivateRoute';
import { AppView }  from '../AppView';
import { LoginView } from '../LoginView';
import { CallbackView } from '../CallbackView';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../../reducers';
import { history } from '../../helpers';
import "../../assets/scss/material-kit-react.scss?v=1.8.0";



const store = createStore(
  reducer, 
  applyMiddleware(thunk), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-ignore-line
);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path='/' component={AppView} />
                <Route exact path="/login" component={LoginView}/>
                <Route exact path="/callback" component={CallbackView}/>
            </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
