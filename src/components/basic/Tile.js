import React from 'react';
import PropTypes from 'prop-types';
import EditButton from './EditButton';

export default class Tile extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    children: PropTypes.node,
    width: PropTypes.number,
    edit: PropTypes.bool,
    onEditClick: PropTypes.func
  };

  static defaultProps = {
    color: 'silver',
    width: 1,
    edit: false,
    onEditClick: () => {}
  };

  render() {
    const { children, color, width, edit, onEditClick } = this.props;

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

    const style = {
      position: 'absolute',
      width: '100%',
      paddingTop: '15px',
      paddingRight: '15px'
    };

    return (
      <div className={`col-xs-${width}`}>
        <div style={squareStyle}>
          <div style={style}>
            <EditButton visible={edit} active={true} onEditClick={onEditClick}/>
          </div>
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
