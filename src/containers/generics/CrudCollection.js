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
    parentName: PropTypes.string,
    parentField: PropTypes.string,
    parentId: PropTypes.number,
    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: ''
  };

  componentWillMount() {
    const { model, parent, dispatch, hasParent } = this.props;

    if (model.needsFetch) {
      dispatch(model.fetch)
    }

    if (hasParent && parent.needsFetch) {
      dispatch(parent.fetch)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { model, parent } = nextProps;
    const { dispatch, hasParent } = this.props;

    if (model.needsFetch) {
      dispatch(model.fetch);
    }

    if (hasParent && parent.needsFetch) {
      dispatch(parent.fetch)
    }
  }

  render() {
    const { isLoading, data } = this.props.model;
    const { edit, prefix, cols } = this.props;

    return <Main isLoading={isLoading} data={data} edit={edit} cols={cols} prefix={prefix}/>
  }
}

function mapStateToProps(state, ownProps) {
  const { name, cols, parentName, parentId, parentField } = ownProps;
  const hasParent = typeof parentName !== 'undefined';
  let adds = { hasParent };
  let opts = {};

  if (hasParent) {
    adds['parent'] = select(actions.fetchEntity(parentName, parentId), state.models);
    opts[parentField] = parentId;
  }

  if (typeof cols === 'undefined') {
    if (hasParent) {
      if (adds.parent.isLoading) {
        adds['cols'] = 1;
      } else {
        adds['cols'] = adds.parent.data.cols;
      }
    } else {
      adds['cols'] = parseInt(state.config.ROOM_COLS, 10);
    }
  }

  return {
    edit: state.mode.edit,
    config: state.config,
    model: select(actions.fetchEntities(name, opts), state.models),
    ...adds
  }
}

export default connect(mapStateToProps)(CrudCollection);
