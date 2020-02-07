import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAppViewData, saveLogin } from '../../actions';

class CallbackView extends Component {

  componentDidMount() {
    this.props.saveLogin();
  }


  render() {
    return (
      <div> Successful login </div>
    );
  }
}

const mapStateToProps = getAppViewData;

const mapDispatchToProps = { saveLogin };

const connectedCallbackView = withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})((CallbackView)));

export { connectedCallbackView as CallbackView };
