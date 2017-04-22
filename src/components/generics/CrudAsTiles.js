import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Tile from '../basic/Tile';
import Tiles from '../basic/Tiles';

class CrudTile extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    data: PropTypes.object,
    edit: PropTypes.bool,
    prefix: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(event) {
    this.setState({ redirect: true });
  }

  render() {
    const { data, width, edit, prefix } = this.props;
    const { id, name } = data;

    if (this.state.redirect) {
      return (<Redirect to={`${prefix}/${id}/edit/`} push={true} />);
    }

    if (name === '{add}') {
      return (
        <Tile color='silver' width={width}>
          <h2><Link to={`${prefix}/add/`}><span className="glyphicon glyphicon-plus-sign"/></Link></h2>
        </Tile>
      );
    } else {
      return (
        <Tile color='silver' width={width} edit={edit} onEditClick={this.handleEditClick}>
          <h2><Link to={`${prefix}/${id}/`}>{name}</Link></h2>
        </Tile>
      );
    }
  }
}

export default class CrudAsTiles extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.array,
    edit: PropTypes.bool,
    cols: PropTypes.number,
    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: ''
  };

  render() {
    const { isLoading, data, edit, prefix, cols } = this.props;

    if (isLoading) {
      return <div>
        <p>loading...</p>
      </div>
    } else {
      return (
        <Tiles cols={cols} items={data} renderer={CrudTile} edit={edit} rendererParams={{ prefix }} />
      );
    }
  }
}
