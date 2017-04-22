import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/crud';
import { select } from 'redux-crud-store';
import Main from '../../components/generics/CrudAsTiles';


class CrudCollection extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    cols: PropTypes.number,
    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: ''
  };

  componentWillMount() {
    const { model, dispatch } = this.props;
    if (model.needsFetch) {
      dispatch(model.fetch)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { model } = nextProps;
    const { dispatch } = this.props;
    if (model.needsFetch) {
      dispatch(model.fetch);
    }
  }

  render() {
    const { isLoading, data } = this.props.model;
    const { edit, prefix, cols } = this.props;

    return <Main isLoading={isLoading} data={data} edit={edit} cols={cols} prefix={prefix}/>
  }
}

function mapStateToProps(state, ownProps) {
  const { name, cols } = ownProps;
  const adds = {};

  if (typeof cols === 'undefined') {
    adds['cols'] = parseInt(state.config.ROOM_COLS, 10);
  }
  return {
    edit: state.mode.edit,
    config: state.config,
    model: select(actions.fetchEntities(name), state.models),
    ...adds
  }
}

export default connect(mapStateToProps)(CrudCollection);
