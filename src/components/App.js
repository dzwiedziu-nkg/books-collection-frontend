import React from 'react';
import 'bootstrap';
import '../styles/App.css';

class AppComponent extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Jumbotron heading</h1>
          <p className="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
          <p><a className="btn btn-lg btn-success" href="" role="button">Sign up today</a></p>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
