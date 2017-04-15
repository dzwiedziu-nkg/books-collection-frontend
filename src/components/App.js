import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap';
import '../styles/App.css';
import Rooms from './Rooms';

class AppComponent extends React.Component {

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AppComponent;
