import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import * as actions from '../actions/ajax';
import { reducer } from '../reducers/rooms';


class Rooms extends React.Component {
  componentDidMount() {
    const { getDataRequested } = this.props;
    getDataRequested();
  }

  render() {
    const { isLoading, isError, repositories } = this.props.rooms;

    return (
      <div>
        {repositories.map((item, index) => {
          return (<div key={index}>
            {item.name}
          </div>);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataRequested: () => dispatch(actions.getDataRequested())
  };
};

Rooms = connect(mapStateToProps, mapDispatchToProps)(Rooms);

export default Rooms;
