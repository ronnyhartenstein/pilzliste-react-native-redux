import * as actions from './actionTypes'

export function switchTab(tab) {
  return {
    type: actions.SWITCH_TAB,
    tab
  };
}
