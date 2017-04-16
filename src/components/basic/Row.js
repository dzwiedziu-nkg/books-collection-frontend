import React from 'react';
import PropTypes from 'prop-types';

export default class Row extends React.Component {
  static propTypes = {
    tiles: PropTypes.array
  };

  render() {
    const { tiles } = this.props;

    return (
      <div className="row">
        {tiles.map((item, index) => {
          return (
            <div key={index}>{item}</div>
          );
        })}
      </div>
    );
  }
}
