import React from 'react';
import ReactDOM from 'react-dom';

// Styling
import './css/reset.css';
import './scss/style.scss';

// Components
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'));
