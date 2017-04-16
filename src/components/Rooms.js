import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tile from './basic/Tile';
import Tiles from './basic/Tiles';

class Room extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    data: PropTypes.object
  };

  render() {
    const { data, width } = this.props;
    const { id, name } = data;
    return (
      <Tile color='silver' width={width}><h2><Link to={`/${id}/`}>{name}</Link></h2></Tile>
    );
  }
}

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
      return (
        <Tiles cols={2} items={data} renderer={Room}/>
      );
    }
  }
}

export default Rooms;
