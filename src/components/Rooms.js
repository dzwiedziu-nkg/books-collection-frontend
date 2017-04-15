import React from 'react';
import PropTypes from 'prop-types';

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
          {data.map((item, index) => {
            return (<div key={index}>
              {item.name}
            </div>);
          })}
        </div>
      );
    }
  }
}

export default Rooms;
