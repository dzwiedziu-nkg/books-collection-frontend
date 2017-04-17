import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'bootstrap';
import '../styles/App.css';

class AppComponent extends React.Component {

  static propTypes = {
    brand_name: PropTypes.string,
    children: PropTypes.node,
    edit: PropTypes.bool,
    onEditChange: PropTypes.func
  };

  static defaultProps = {
    edit: false,
    onEditChange: (edit) => {}
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onEditChange(!this.props.edit);
  }

  render() {
    const { edit } = this.props;
    const editIconStyle = {
      fontSize: '24px',
      color: edit ? 'black' : 'silver'
    };

    return (
      <div className="container">
        <div className="jumbotron">
          <div className='btn-toolbar pull-right'>
            <div className='btn-group'>
              <spam className="glyphicon glyphicon-cog" aria-hidden="true" onClick={this.handleClick} style={editIconStyle}/>
            </div>
          </div>
          <h1><Link to="/">{this.props.brand_name}</Link></h1>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default AppComponent;
