import * as actions from './actionTypes';

export function createItem(name, lat, beschreibung) {
  return {
    type: actions.ADD,
    item: { name, lat, beschreibung }
  };
}

export function updateItem(nr, name, lat, beschreibung) {
  return {
    type: actions.UPDATE,
    item: { nr, name, lat, beschreibung }
  };
}

export function deleteItem(nr) {
  return {
    type: actions.DELETE,
    nr
  };
}
