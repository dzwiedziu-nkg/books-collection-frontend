import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'bootstrap';
import '../styles/App.css';

class AppComponent extends React.Component {

  static propTypes = {
    brand_name: PropTypes.string,
    children: PropTypes.node
  };

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1><Link to="/">{this.props.brand_name}</Link></h1>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default AppComponent;
