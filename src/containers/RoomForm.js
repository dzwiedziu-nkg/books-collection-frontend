import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/crud';
import { setNotify } from '../actions/mode';
import { select, selectActionStatus } from 'redux-crud-store';
import { withRouter, Redirect } from 'react-router-dom';
import { createEntity, updateEntity, deleteEntity } from '../actions/crud';
import { clearModelData } from 'redux-crud-store';


class RoomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.loadToState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    const { edit, room, dispatch } = this.props;
    if (edit && room.needsFetch) {
      dispatch(room.fetch)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { room } = nextProps;
    const { edit, dispatch } = this.props;
    if (edit && room.needsFetch) {
      dispatch(room.fetch);
    }
  }

  componentDidMount() {
    this.loadToStateIfNeed();
  }

  componentDidUpdate() {
    this.loadToStateIfNeed();
  }

  componentWillUnmount() {
    this.setNotifyIfNeed();
  }

  loadToStateIfNeed() {
    if (!this.state.ready && this.props.edit && !this.props.room.isLoading) {
      this.setState(this.loadToState());
    }
  }

  loadToState() {
    let state = {name: '', cols: 2, colspan: 1 };
    if (this.props.edit) {
      if (this.props.room.isLoading) {
        return {...state, ready: false};
      }
      return {...this.props.room.data, ready: true};
    } else {
      return {...state, ready: true};
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { edit, dispatch } = this.props;

    const status = edit ? this.props.update : this.props.create;

    if (status.pending) {
      return;
    }

    let data = { name: this.state.name, cols: this.state.cols, colspan: this.state.colspan };
    if (edit) {
      dispatch(updateEntity('rooms', this.props.room.data.id, data));
      this.setState({action: 'update'});
    } else {
      dispatch(createEntity('rooms', data));
      this.setState({action: 'create'});
    }
  }

  handleCancel(event) {
    event.preventDefault();
    window.history.back();
  }

  handleDelete(event) {
    // TODO: confirm of deletion
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(deleteEntity('rooms', this.props.room.data.id));
    this.setState({action: 'delete'});
  }

  getAction() {
    if ('action' in this.state) {
      const action = this.props[this.state.action];
      const { pending, error, response } = action;
      const done = ('error' in action && error !== null) || ('response' in action && response !== null);
      let ok = done && (!('error' in action) || error === null);
      // TODO: modify ApiClient to support 204 as success of delete
      if (this.state.action === 'delete' && done && !ok && 'message' in error && 'stack' in error && error.message === "Unexpected end of JSON input" && error.stack === "SyntaxError: Unexpected end of JSON input") {
        ok = true;
      }
      return { pending, done, ok, error, response };
    }
    return { pending: false, done: false, ok: false };
  }

  setNotifyIfNeed() {
    if ('action' in this.state) {
      const { dispatch } = this.props;
      const { ok } = this.getAction();
      const { name } = this.state;
      if (ok) {
        let text = null;
        if (this.state.action === 'create') {
          text = `Dodano pokój o nazwie: ${name}`;
        } else if (this.state.action === 'update') {
          text = `Zapisano zmiany w ustawieniach pokoju o nazwie: ${name}`;
        } else if (this.state.action === 'delete') {
          text = `Usunięto pokój o nazwie: ${name}`;
        }
        dispatch(setNotify(text, "success"));
        dispatch(clearModelData('rooms')); // TODO: remove after modify ApiClient to support 204 as success of delete
      }
    }
  }

  render() {
    const { ready, name, cols, colspan } = this.state;
    const { edit } = this.props;
    const { pending, error, ok } = this.getAction();

    if (!ready) {
      return (<p>Loading...</p>);
    } else {

      if (ok) {
        return (<Redirect to={'/'} push={true}/>);
      }

      const formatError = error ? ('detail' in error ? error.detail : error.statusText) : null;

      return (
        <div className="col-md-offset-2 col-md-8 col-lg-offset-4 col-lg-6">
          <div className="panel panel-default">
            <div className="panel-heading">{ edit ? 'Ustawienia pokoju' : 'Dodaj nowy pokój' }</div>
            <div className="panel-body">
              { pending ? (<div className="alert alert-info" role="alert">Trwa zapisywanie danych...</div>) : null }
              { formatError ? (<div className="alert alert-danger" role="alert">{formatError}</div>) : null }
              <form className="form" onSubmit={this.handleSubmit}>

                <div className="form-group">
                  <label className="control-label" htmlFor="roomName">Nazwa</label>
                  <input type="text" className="form-control" id="roomName" aria-describedby="helpBlockRoomName" name="name" value={name} onChange={this.handleChange}/>
                  <span id="helpBlockRoomName" className="help-block">Tu wpisz nazwę pokoju, jaka będzie się wyświetlać na stronie.</span>
                </div>

                <div className="form-group">
                  <label className="control-label" htmlFor="roomColspan">Szerokość</label>
                  <input type="number" className="form-control" id="roomColspan" aria-describedby="helpBlockRoomColspan" name="colspan" value={colspan} onChange={this.handleChange}/>
                  <span id="helpBlockRoomColspan" className="help-block">Szerokość bloku z tym pokojem (na ile kwadratów ma się on rozlać).</span>
                </div>

                <div className="form-group">
                  <label className="control-label" htmlFor="roomCols">Kolumny</label>
                  <input type="number" className="form-control" id="roomCols" aria-describedby="helpBlockRoomCols" name="cols" value={cols} onChange={this.handleChange}/>
                  <span id="helpBlockRoomCols" className="help-block">Na ile kwadratów w poziomie ma być podzielony ten pokój.</span>
                </div>

                <div className="form-group">
                  { edit ? (
                    <div style={{textAlign: 'right', float: 'right'}}>
                      <button className="btn btn-danger" onClick={this.handleDelete}>Usuń</button>
                    </div>
                  ) : null}
                  <div style={{textAlign: 'center'}}>
                    <button type="submit" className="btn btn-primary">Zapisz</button>&nbsp;
                    <button className="btn btn-default" onClick={this.handleCancel}>Anuluj</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;
  if ('room' in params) {
    return {
      update: selectActionStatus('rooms', state.models, 'update'),
      delete: selectActionStatus('rooms', state.models, 'delete'),
      room: select(actions.fetchEntity('rooms', params.room), state.models),
      edit: true
    };
  }

  return {
    create: selectActionStatus('rooms', state.models, 'create'),
    edit: false
  };
}

RoomForm = withRouter(connect(mapStateToProps)(RoomForm));

export default RoomForm;
