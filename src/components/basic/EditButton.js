import React from 'react';
import PropTypes from 'prop-types';

export default class EditButton extends React.Component {

  static propTypes = {
    visible: PropTypes.bool,
    active: PropTypes.bool,
    onEditClick: PropTypes.func,
    fontSize: PropTypes.string
  };

  static defaultProps = {
    visible: true,
    active: false,
    fontSize: '24px',
    onEditClick: () => {}
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onEditClick();
  }

  render() {
    const { visible, active, onEditClick, fontSize } = this.props;

    const editIconStyle = {
      fontSize,
      color: active ? 'black' : 'silver'
    };

    const editBlockStyle = visible ? {} : {
      display: 'none'
    };

    return (
      <div className='btn-toolbar pull-right' style={editBlockStyle}>
        <div className='btn-group'>
          <spam className="glyphicon glyphicon-cog" aria-hidden="true" onClick={onEditClick} style={editIconStyle}/>
        </div>
      </div>
    );
  }
}
