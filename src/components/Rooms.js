import React from 'react';
import PropTypes from 'prop-types';
import Tile from './basic/Tile';

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
        <div>
          <div className="row">
            {data.map((item, index) => {
              return (
                <Tile key={index} color='silver' width='6'>
                  <h2>{item.name}</h2>
                </Tile>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default Rooms;
