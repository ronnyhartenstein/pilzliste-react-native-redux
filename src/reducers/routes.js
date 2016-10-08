import { ActionConst } from 'react-native-router-flux';

// Redux Flux: https://github.com/aksonov/react-native-router-flux/blob/master/docs/REDUX_FLUX.md
const initialState = {
  scene: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      };

    // ...other actions

    default:
      return state;
  }
}