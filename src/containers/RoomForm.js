import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/crud';
import { select } from 'redux-crud-store';
import { withRouter } from 'react-router-dom';


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

  loadToStateIfNeed() {
    if (!this.state.ready && this.props.edit && !this.props.room.isLoading) {
      this.setState(this.loadToState());
    }
  }

  loadToState() {
    let state = {name: '', cols: 2, colspan: 1};
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
    alert('A name was submitted: ' + this.state.name);
    event.preventDefault();
  }

  handleCancel(event) {
    event.preventDefault();
    window.history.back();
  }

  handleDelete(event) {
    //window.history.back();
    alert('Delete: ' + this.state.name);
    event.preventDefault();
  }

  render() {
    const { ready, name, cols, colspan } = this.state;
    const edit = 'room' in this.props;

    if (!ready) {
      return (<p>Loading...</p>);
    } else {
      return (
        <div className="col-md-offset-2 col-md-8 col-lg-offset-4 col-lg-6">
          <div className="panel panel-default">
            <div className="panel-heading">{ edit ? 'Ustawienia pokoju' : 'Dodaj nowy pokój' }</div>
            <div className="panel-body">
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
                  ) : ''}
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
    return {room: select(actions.fetchEntity('rooms', params.room), state.models), edit: true};
  }
  return {edit: false};
}

RoomForm = withRouter(connect(mapStateToProps)(RoomForm));

export default RoomForm;
