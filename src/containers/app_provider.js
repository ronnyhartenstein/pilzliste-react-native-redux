import React, { Component } from 'react'
import store from '../store';
import {Provider} from 'react-redux';
import App from './app'; 

export default class AppProvider extends Component {
  render() {
    return (
        <Provider store={store}>
        {() => <App />}
        </Provider>
    )
  }
}
