import React, { Component } from 'react'
import store from '../store';
import { Provider, connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import ListsScene from '../scenes/lists'
import SearchScene from '../scenes/search'
import DetailsScene from '../scenes/details'

// Mini-Tutorial: https://github.com/aksonov/react-native-router-flux/blob/master/docs/MINI_TUTORIAL.md
// Redux-Flux: https://github.com/aksonov/react-native-router-flux/blob/master/docs/REDUX_FLUX.md

const RouterWithRedux = connect()(Router);

export default class App extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    return (
        <Provider store={store}>
          <RouterWithRedux>
            <Scene key="root">
              <Scene key="lists" component={ListsScene} title="Listen" initial={true} />
              <Scene key="details" component={DetailsScene} title="Details" />
              <Scene key="search" component={SearchScene} title="Erweiterte Suche" />
            </Scene>
          </RouterWithRedux>
        </Provider>
    )
  }
}
