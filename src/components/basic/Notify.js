import React from 'react';
import PropTypes from 'prop-types';

export default class Notify extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.string
  };

  render() {
    const { style, children } = this.props;

    return (
      <div className={`alert alert-${style}`} role="alert">
        {children}
      </div>
    );
  }
}
