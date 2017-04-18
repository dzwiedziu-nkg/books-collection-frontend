import React from 'react';
import { connect } from 'react-redux';
import Main from '../components/basic/Notify';


class Notify extends React.Component {
  render() {
    const { text, style } = this.props;

    if (text === null) {
      return null;
    }

    return (<Main style={style}>{text}</Main>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    text: state.mode.notify,
    style: state.mode.notify_style
  }
}

Notify = connect(mapStateToProps)(Notify);

export default Notify;
