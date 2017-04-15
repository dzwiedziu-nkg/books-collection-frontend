import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/crud';
import { select } from 'redux-crud-store';


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
    const { isLoading, needsFetch, data } = this.props.rooms;

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

function mapStateToProps(state, ownProps) {
  return { rooms: select(actions.fetchEntities('rooms'), state.models) }
}

Rooms = connect(mapStateToProps)(Rooms);

export default Rooms;
