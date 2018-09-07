import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Styling
import './css/reset.css';
import './scss/style.scss';

// Components
import Header from './components/Header';
import AuthLogin from './components/auth/Login';
import UsersIndex from './components/users/Index';
import UsersShow from './components/users/Show';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={AuthLogin} />
            <Route exact path="/users" component={UsersIndex} />
            <Route path="/users/:userId" component={UsersShow} />
          </Switch>
        </main>
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'));
