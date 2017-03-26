import React from 'react';
import 'bootstrap';
import '../styles/App.css';
import Rooms from './Rooms';

class AppComponent extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Jumbotron heading</h1>
          <Rooms/>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
