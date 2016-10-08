import React, { Component } from 'react'
import store from '../store';
import { Provider, connect } from 'react-redux';
import { Router, Scene, Modal, ActionConst } from 'react-native-router-flux';
import ListsScene from '../scenes/lists'
import SearchScene from '../scenes/search'
import DetailsScene from '../scenes/details'
import Error from '../components/Error'

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
            <Scene key="modal" component={Modal} sceneStyle={{backgroundColor:'#F7F7F7'}}>
              <Scene key="root" hideNavBar={true}>
                <Scene key="lists" component={ListsScene} title="Listen" initial={true} type={ActionConst.REPLACE} />
                <Scene key="details" hideNavBar={false} component={DetailsScene} title="Details" />
                <Scene key="search" hideNavBar={false} direction="vertical" component={SearchScene} title="Erweiterte Suche" />
              </Scene>
              <Scene key="error" component={Error}/>
            </Scene>
          </RouterWithRedux>
        </Provider>
    )
  }
}
