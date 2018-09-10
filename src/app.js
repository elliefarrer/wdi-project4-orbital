import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Styling
import './css/reset.css';
import './scss/style.scss';

// Components
import SecureRoute from './components/common/SecureRoute';
import FlashMessages from './components/common/FlashMessage';

import Header from './components/Header';
import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';
import UsersIndex from './components/users/Index';
import UsersShow from './components/users/Show';
import UsersEdit from './components/users/Edit';
import ChatsIndex from './components/chats/Index';
import ChatsShow from './components/chats/Show';

// Libraries
import Auth from './lib/Auth';

//BUG: can't go from a user's show page to profile page. Could possibly do this with a different component?

class App extends React.Component {
  render() {
    return (
      <div>
        {Auth.isAuthenticated() &&
          <Header />
        }
        <FlashMessages />
        <main>
          <Switch>
            <Route exact path="/" component={AuthLogin} />
            <Route exact path="/register" component={AuthRegister} />
            <SecureRoute exact path="/users" component={UsersIndex} />
            <SecureRoute exact path="/users/:userId/chats" component={ChatsIndex} />
            <SecureRoute path="/users/:userId/chats/:chatId" component={ChatsShow} />
            <SecureRoute exact path="/users/:userId" component={UsersShow} />
            <SecureRoute path={`/users/${Auth.currentUserId()}/edit`} component={UsersEdit} />
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
