import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Styling
import './css/reset.css';
import './scss/style.scss';

// Components
import Header from './components/Header';
import AuthLogin from './components/auth/Login';
import AuthRegister from './components/auth/Register';
import UsersIndex from './components/users/Index';
import UsersShow from './components/users/Show';
import UsersEdit from './components/users/Edit';
import ChatsIndex from './components/chats/Index';

// Libraries
import Auth from './lib/Auth';

//BUG: can't go from a user's show page to profile page. Could possibly do this with a different component?

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={AuthLogin} />
            <Route exact path="/register" component={AuthRegister} />
            <Route exact path="/users" component={UsersIndex} />
            <Route exact path="/users/:userId/chats" component={ChatsIndex} />
            <Route path="/users/:userId" component={UsersShow} />
            {Auth.isAuthenticated() &&
              <Route path={`/users/${Auth.currentUserId()}/edit`} component={UsersEdit} />
            }
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
