import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/config';
import Main from '../components/App'

class App extends React.Component {
  componentDidMount() {
    const { getConfigRequested } = this.props;
    getConfigRequested();
  }

  render() {
    const {config, children} = this.props;
    const {isLoading, options} = config;
    if (config['isLoading']) {
      return <p>loading...</p>;
    } else {
      const BRAND_TITLE = options['BRAND_TITLE'];
      return <Main brand_name={BRAND_TITLE} children={children}/>;
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConfigRequested: () => dispatch(actions.getConfigRequested())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
