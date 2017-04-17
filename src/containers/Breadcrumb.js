import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { select } from 'redux-crud-store';
import { matchPath } from 'react-router'
import * as actions from '../actions/crud';


class Breadcrumb extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    if ('room' in this.props && this.props.room.needsFetch) {
      dispatch(this.props.room.fetch);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if ('room' in nextProps && nextProps.room.needsFetch) {
      dispatch(nextProps.room.fetch);
    }
  }

  render() {
    let crumbs = [];
    crumbs[0] = {to: '/', title: 'Home'};
    if ('room' in this.props && !this.props.room.isLoading) {
      crumbs[1] = {to: `/${this.props.room.data.id}/`, title: this.props.room.data.name};
    }

    let children = [];
    let last = crumbs.length - 1;
    for (let i = 0; i < last; i++) {
      children[i] = <li key={i}><Link to={crumbs[i].to}>{crumbs[i].title}</Link></li>;
    }
    children[last] = <li key={last} className="active">{crumbs[last].title}</li>;

    return (
      <ol className="breadcrumb">
        {children}
      </ol>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let r = {};
  let pathname = state.routing.location.pathname;
  let math = matchPath(pathname, {path: '/:room/'});

  if (math != null) {
    if ('room' in math.params) {
      let room = math.params.room;
      r['room'] = select(actions.fetchEntity('rooms', room), state.models);
    }
  }
  return r;
}

Breadcrumb = withRouter(connect(mapStateToProps)(Breadcrumb));

export default Breadcrumb;
