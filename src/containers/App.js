import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/crud';
import { select } from 'redux-crud-store';
import { withRouter } from 'react-router-dom';
import Main from '../components/App';
import { setEditMode } from '../actions/mode';
import { loadConfig } from '../actions/config';

class App extends React.Component {
  componentWillMount() {
    const { configJson } = this.props;
    this.loadConfigIfNeed(configJson);
  }

  componentWillReceiveProps(nextProps) {
    const { configJson } = nextProps;
    this.loadConfigIfNeed(configJson);
  }

  // TODO: should be load via ApiCall method and parsed by callback after ApiCall success
  loadConfigIfNeed(configJson) {
    const { dispatch, config, loadConfig } = this.props;
    if (config.isLoading) {
      if (!configJson.isLoading) {
        loadConfig(configJson.data);
      } else if (configJson.needsFetch) {
        dispatch(configJson.fetch);
      }
    }
  }

  render() {
    const { isLoading, BRAND_TITLE } = this.props.config;
    const { edit, onEditChange } = this.props;

    if (isLoading) {
      return <p>loading...</p>;
    } else {
      return (<Main brand_name={BRAND_TITLE} children={this.props.children} edit={edit} onEditChange={onEditChange}/>);
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    config: state.config,
    configJson: select(actions.fetchEntities('config'), state.models),
    edit: state.mode.edit
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onEditChange: (editMode) => {
      dispatch(setEditMode(editMode))
    },
    loadConfig: (configJson) => {
      dispatch(loadConfig(configJson))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
