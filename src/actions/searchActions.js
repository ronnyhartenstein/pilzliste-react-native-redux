import * as actions from './actionTypes';

export function doSearch(term) {
  return {
    type: actions.DO_SEARCH,
    term: term
  };
}

export function clearSearch() {
  return {
    type: actions.CLEAR_SEARCH
  };
}