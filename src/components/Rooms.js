import React from 'react';
import PropTypes from 'prop-types';

class Rooms extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array
  };

  render() {
    const { isLoading, data } = this.props;

    const squareStyle = {
      float: 'left',
      position: 'relative',
      width: '100%',
      paddingBottom : '100%',
      overflow: 'hidden',
      backgroundColor: 'silver'
    };

    const contentStyle = {
      position: 'absolute',
      height: '80%',
      width: '90%',
      margin: '10% 5%'
    };

    const tableStyle = {
      display: 'table',
      height: '100%',
      width: '100%'
    };

    const tableCellStyle = {
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'center',
      height: '100%',
      width: '100%'
    };

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
                <div key={index} className="col-xs-6">
                  <div style={squareStyle}>
                    <div style={contentStyle}>
                      <div style={tableStyle}>
                        <div style={tableCellStyle}>
                          <h2>{item.name}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default Rooms;
