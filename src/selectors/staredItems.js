import { createSelector } from 'reselect'
import _ from 'lodash'

// Memoized Selectors: http://redux.js.org/docs/recipes/ComputingDerivedData.html

const getItems = (state) => state.items

// der Memoized Selectors
const getStaredItems = createSelector(
  [ getItems ],
  (items) => {
      return _.filter(items, itm => ( itm.stern ))
  }
)

export default getStaredItems