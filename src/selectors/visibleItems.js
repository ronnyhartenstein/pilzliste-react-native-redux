import { createSelector } from 'reselect'
import _ from 'lodash'

// Memoized Selectors: http://redux.js.org/docs/recipes/ComputingDerivedData.html

const getSearch = (state) => state.search
const getItems = (state) => state.items

// der Memoized Selectors
const getVisibleItems = createSelector(
  [ getSearch, getItems ],
  (search, items) => {
    if (_.isEmpty(search) || search.length < 3) {
      return items
    } else {
      // Suchbegriffe mit Leerzeichen getrennt..
      const terms = search.trim().split(' ')
      const startTime = new Date()
      const result = _.filter(items, itm => { 
          const haystack = _.values(itm).join(' ')
          return terms.map(term => ( haystack.indexOf(term) !== -1 )) // Treffer je Suchbegriff?
                      .reduce((prev, curr) => ( prev && curr ), true) // alle Suchbegriffe true? 
      })
      console.log(`Suche: ${result.length} Treffer in ${new Date() - startTime}ms`)
      return result
    }
  }
)

export default getVisibleItems