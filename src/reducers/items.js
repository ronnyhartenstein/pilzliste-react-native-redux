import React from 'react'
import { AsyncStorage } from 'react-native'
import * as actions from '../actions/actionTypes';
import _ from 'lodash';

let STORAGE_KEY = '@Pilzliste:stars'

export default function itemsReducer (items = [], action = {}) {
  let index, item, itemsList, itemIdsWithStar
  switch (action.type) {

    case actions.CREATE:
      let id = parseInt(_.maxBy(items, n => ( n.id )) + 1)
      return [
        ...items,
        Object.assign({}, action.item, { id })
      ]

    case actions.UPDATE:
      index = _.findIndex(items, (item) => item.id === action.item.id)
      if (index === -1) {
        return items
      }
      return [
        ...items.slice(0, index),
        Object.assign({}, action.item),
        ...items.slice(index + 1)
      ]

    case actions.SET_STAR:
      item = _.find(items, itm => ( itm.id == action.id ))
      if (item === undefined) {
        return items
      }
      item.stern = true
      index = _.findIndex(items, (item) => item.id === action.id)
      // console.log('reducer SET_STAR', item, index)
      if (index === undefined) {
        return items
      }
      newItems = [
        ...items.slice(0, index),
        Object.assign({}, item),
        ...items.slice(index + 1)
      ]
      itemIdsWithStar = _.filter(newItems, function(o) { return o.stern })
      itemIdsWithStar = _.map(itemIdsWithStar, function(o) { return o.id })
      console.log("gesternt. ", itemIdsWithStar)
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(itemIdsWithStar))
      return newItems
      
    case actions.UNSET_STAR:
      item = _.find(items, itm => ( itm.id == action.id ))
      if (item === undefined) {
        return items
      }
      item.stern = false
      index = _.findIndex(items, (item) => item.id === action.id)
      // console.log('reducer UNSET_STAR', item, index)
      if (index === undefined) {
        return items
      }
      newItems = [
        ...items.slice(0, index),
        Object.assign({}, item),
        ...items.slice(index + 1)
      ]
      itemIdsWithStar = _.filter(newItems, function(o) { return o.stern })
      itemIdsWithStar = _.map(itemIdsWithStar, function(o) { return o.id })
      console.log("entsternt. ", itemIdsWithStar)
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(itemIdsWithStar))
      return newItems

    case actions.DELETE:
      index = _.findIndex(items, (item) => item.id === action.id)
      if (index === -1) {
        return items
      }
      return [
        ...items.slice(0, index),
        ...items.slice(index + 1)
      ]

    default:
      return items;
  }
}
