import React from 'react';
import PropTypes from 'prop-types';
import Tile from './basic/Tile';
import Row from './basic/Row';

class Rooms extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array
  };

  render() {
    const { isLoading, data } = this.props;

    if (isLoading) {
      return <div>
        <p>loading...</p>
      </div>
    } else {

      let tiles = [];
      for (let i = 0; i < data.length; i++) {
        tiles[i] = <Tile color='silver' width={6}><h2>{data[i].name}</h2></Tile>;
      }

      return <Row tiles={tiles}/>;
    }
  }
}

export default Rooms;
