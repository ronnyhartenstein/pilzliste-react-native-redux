import * as actions from './actionTypes'

export function createItem(name, lat, beschreibung) {
  return {
    type: actions.ADD,
    item: { name, lat, beschreibung }
  };
}

export function updateItem(id, name, lat, beschreibung) {
  return {
    type: actions.UPDATE,
    item: { id, name, lat, beschreibung }
  };
}

export function deleteItem(id) {
  return {
    type: actions.DELETE,
    id
  };
}

export function setStar(id) {
  // console.log('action setStar', id)
  return {
    type: actions.SET_STAR,
    id
  };
}

export function unsetStar(id) {
  // console.log('action unsetStar', id)
  return {
    type: actions.UNSET_STAR,
    id
  };
}

export function updateNumberItems(number) {
  // console.log(`neue Anzahl ${number}..`)
  return {
    type: actions.NUMBER_ITEMS,
    number
  };
}
