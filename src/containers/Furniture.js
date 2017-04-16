import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/crud';
import { select } from 'redux-crud-store';
import Main from '../components/Furniture'


class Furniture extends React.Component {
  componentWillMount() {
    const { furniture, dispatch } = this.props;
    if (furniture.needsFetch) {
      dispatch(furniture.fetch)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { furniture } = nextProps;
    const { dispatch } = this.props;
    if (furniture.needsFetch) {
      dispatch(furniture.fetch);
    }
  }

  render() {
    const { isLoading, data } = this.props.furniture;

    return <Main isLoading={isLoading} data={data}/>
  }
}

function mapStateToProps(state, ownProps) {
  return { furniture: select(actions.fetchEntities('furniture', {room: ownProps.match.params.room}), state.models) }
}

Furniture = connect(mapStateToProps)(Furniture);

export default Furniture;
