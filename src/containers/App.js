import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/crud';
import { select } from 'redux-crud-store';
import { withRouter } from 'react-router-dom';
import Main from '../components/App'

class App extends React.Component {
  componentWillMount() {
    const { config, dispatch } = this.props;
    if (config.needsFetch) {
      dispatch(config.fetch)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { config } = nextProps;
    const { dispatch } = this.props;
    if (config.needsFetch) {
      dispatch(config.fetch);
    }
  }

  render() {
    const { isLoading, data } = this.props.config;
    if (isLoading) {
      return <p>loading...</p>;
    } else {
      const BRAND_TITLE = data[0]['value'];
      return <Main brand_name={BRAND_TITLE} children={this.props.children}/>;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { config: select(actions.fetchEntities('config'), state.models) }
}

export default withRouter(connect(mapStateToProps)(App));
