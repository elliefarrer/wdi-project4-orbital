import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Styling
import './css/reset.css';
import './scss/style.scss';

// Components
import Header from './components/Header';
import UsersIndex from './components/users/Index';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Switch>
            <Route exact path="/users" component={UsersIndex} />
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
