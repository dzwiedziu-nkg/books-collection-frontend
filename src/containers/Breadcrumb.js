import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { matchPath } from 'react-router'
import { selectEntity, fetchNeeds, isSomeLoadings } from '../lib/CrudUtils'

const modelToEntity = {
  rooms: 'room',
  furniture: 'furniture',
  shelves: 'shelf',
  books: 'book'
};

const paths = [
  { path: '/:room/add/', modelNames: [], opts: { add: true } },
  { path: '/:room/:furniture/edit/', modelNames: ['rooms', 'furniture'], opts: { edit: true } },
  { path: '/:room/:furniture/', modelNames: ['rooms', 'furniture'], opts: {} },
  { path: '/add/', modelNames: [], opts: { add: true } },
  { path: '/:room/edit/', modelNames: ['rooms'], opts: { edit: true } },
  { path: '/:room/', modelNames: ['rooms'], opts: {} }
];

class Breadcrumb extends React.Component {
  componentWillMount() {
    this.doFetchNeeds(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.doFetchNeeds(nextProps);
  }

  doFetchNeeds(props) {
    const { dispatch } = this.props;
    const { room, furniture, shelf, book } = props;
    fetchNeeds(dispatch, [room, furniture, shelf, book]);
  }

  render() {
    const { room, furniture, shelf, book } = this.props;

    let crumbs = [];
    crumbs[0] = {to: '/', title: 'Home'};
    if (!isSomeLoadings([room, furniture, shelf, book])) {
      if ('room' in this.props) {
        crumbs[1] = {to: `/${this.props.room.data.id}/`, title: this.props.room.data.name};
      }
      if ('furniture' in this.props) {
        crumbs[2] = {
          to: `/${this.props.room.data.id}/${this.props.furniture.data.id}/`,
          title: this.props.furniture.data.name
        };
      }
    }

    if (this.props.edit) {
      crumbs[crumbs.length] = {to: '', title: 'Edycja'};
    }

    if (this.props.add) {
      crumbs[crumbs.length] = {to: '', title: 'Dodaj nowy'};
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
  const pathname = state.routing.location.pathname;

  for (let i = 0; i < paths.length; i++) {
    const { path, modelNames, opts } = paths[i];
    const math = matchPath(pathname, { path });
    if (math !== null) {
      r = { ...r, ...opts };
      for (let j = 0; j < modelNames.length; j++) {
        const modelName = modelNames[j];
        const fieldName = modelToEntity[modelName];
        const id = math.params[fieldName];
        r[fieldName] = selectEntity(state.models, modelName, id);
      }
      break;
    }
  }
  return r;
}

Breadcrumb = withRouter(connect(mapStateToProps)(Breadcrumb));

export default Breadcrumb;
