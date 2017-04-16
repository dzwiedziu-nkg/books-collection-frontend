import React from 'react';
import PropTypes from 'prop-types';

export default class Tile extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    children: PropTypes.node,
    width: PropTypes.number
  };

  static defaultProps = {
    color: 'silver',
    width: 1
  };

  render() {
    const { children, color, width } = this.props;

    const squareStyle = {
      float: 'left',
      position: 'relative',
      width: '100%',
      paddingBottom : '100%',
      overflow: 'hidden',
      backgroundColor: color
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

    return (
      <div className={`col-xs-${width}`}>
        <div style={squareStyle}>
          <div style={contentStyle}>
            <div style={tableStyle}>
              <div style={tableCellStyle}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
