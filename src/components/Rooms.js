import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tile from './basic/Tile';
import Tiles from './basic/Tiles';

class Room extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    data: PropTypes.object,
    edit: PropTypes.bool
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
      }).isRequired,
      staticContext: PropTypes.object
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(event) {
    const { id } = this.props.data;
    const { history } = this.context.router;
    history.push(`/${id}/edit/`);
  }

  render() {
    const { data, width, edit } = this.props;
    const { id, name } = data;
    if (name === '{add}') {
      return (
        <Tile color='silver' width={width}>
          <h2><Link to={`/add/`}><span className="glyphicon glyphicon-plus-sign"/></Link></h2>
        </Tile>
      );
    } else {
      return (
        <Tile color='silver' width={width} edit={edit} onEditClick={this.handleEditClick}>
          <h2><Link to={`/${id}/`}>{name}</Link></h2>
        </Tile>
      );
    }
  }
}

class Rooms extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array,
    edit: PropTypes.bool,
    cols: PropTypes.number
  };

  render() {
    const { isLoading, data, edit } = this.props;

    if (isLoading) {
      return <div>
        <p>loading...</p>
      </div>
    } else {
      return (
        <Tiles cols={2} items={data} renderer={Room} edit={edit}/>
      );
    }
  }
}

export default Rooms;
