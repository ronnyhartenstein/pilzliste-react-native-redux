import React, { Component } from 'react'
import store from '../store';
import { Provider, connect } from 'react-redux';
import { Router, Scene, Modal, ActionConst } from 'react-native-router-flux';
import ListeScene from '../scenes/liste'
import GalerieScene from '../scenes/galerie'
import SternlisteScene from '../scenes/sternliste'
import SearchScene from '../scenes/search'
import DetailsScene from '../scenes/details'
import HelpScene from '../scenes/help'
import WebviewScene from '../scenes/webview'
import Error from '../components/Error'

import DemoLoginScene from '../scenes/demos/login'
import DemoMaterialKitScene from '../scenes/demos/rnmk'

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
                <Scene key="liste" component={ListeScene} title="Liste" initial={true} type={ActionConst.REPLACE} />
                <Scene key="galerie" component={GalerieScene} title="Galerie" type={ActionConst.REPLACE} />
                <Scene key="sternliste" component={SternlisteScene} title="Gesternte" type={ActionConst.REPLACE} />
                <Scene key="details" hideNavBar={false} component={DetailsScene} title="Details" />
                <Scene key="search" hideNavBar={false} direction="vertical" component={SearchScene} title="Erweiterte Suche" />
                <Scene key="help" hideNavBar={false} component={HelpScene} title="Hilfe" />
                <Scene key="webview" hideNavBar={false} component={WebviewScene} title="WebView" />

                <Scene key="demo_login" hideNavBar={true} component={DemoLoginScene} sceneStyle={{backgroundColor:'black'}}/>
                <Scene key="demo_rnmk" hideNavBar={true} component={DemoMaterialKitScene} />
              </Scene>
              <Scene key="error" component={Error}/>
            </Scene>
          </RouterWithRedux>
        </Provider>
    )
  }
}
