import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/crud';
import { select } from 'redux-crud-store';
import Main from '../components/Rooms'


class Rooms extends React.Component {
  componentWillMount() {
    const { rooms, dispatch } = this.props;
    if (rooms.needsFetch) {
      dispatch(rooms.fetch)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { rooms } = nextProps;
    const { dispatch } = this.props;
    if (rooms.needsFetch) {
      dispatch(rooms.fetch);
    }
  }

  render() {
    const { isLoading, data } = this.props.rooms;

    return <Main isLoading={isLoading} data={data}/>
  }
}

function mapStateToProps(state, ownProps) {
  return { rooms: select(actions.fetchEntities('rooms'), state.models) }
}

Rooms = connect(mapStateToProps)(Rooms);

export default Rooms;
