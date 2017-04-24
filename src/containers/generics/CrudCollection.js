import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Main from '../../components/generics/CrudAsTiles';
import { selectEntity, selectCollection, fetchNeeds, isSomeLoadings } from '../../lib/CrudUtils'


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
    this.doFetchNeeds(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.doFetchNeeds(nextProps);
  }

  doFetchNeeds(props) {
    const { dispatch } = this.props;
    const { model, parent } = props;
    fetchNeeds(dispatch, [model, parent]);
  }

  render() {
    const { data } = this.props.model;
    const { edit, prefix, cols } = this.props;
    const isLoading = isSomeLoadings(this.props.model, this.props.parent);

    return <Main isLoading={isLoading} data={data} edit={edit} cols={cols} prefix={prefix}/>
  }
}

function mapStateToProps(state, ownProps) {
  const { name, cols, parentName, parentId, parentField } = ownProps;
  const hasParent = typeof parentName !== 'undefined';
  let adds = { hasParent };

  if (hasParent) {
    adds['parent'] = selectEntity(state.models, parentName, parentId);
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
    model: selectCollection(state.models, name, parentField, parentId),
    ...adds
  }
}

export default connect(mapStateToProps)(CrudCollection);
