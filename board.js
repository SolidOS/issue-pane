/**  A Board of vertical columns
 *
 * Like a github "project", or a kanbam board, a board allows
 *  you to triage stuff into simple cateories.
 *
  * if an object is added in a refresh, then a new column should be added if needed
  * if its value is previously unseen
  * (Should the coluimn order be defined by user or caller?)
   *
 * @returns dom:Element
*/

import * as UI from 'solid-ui'
const kb = UI.store
const ns = UI.ns
const $rdf = UI.rdf

export function board (dom, query, columnValues, renderItem, vx, vvalue,
  options) {
  const board = dom.createElement('div')
  board.style = 'width: 100%;'
  board.style.margin = '1em'
  const table = board.appendChild(dom.createElement('table'))
  table.style = 'width: 100%;'
  table.style.borderCollapse = 'collapse'

  const headerRow = table.appendChild(dom.createElement('tr'))
  const mainRow = table.appendChild(dom.createElement('tr'))
  columnValues.forEach(x => {
    const cell = headerRow.appendChild(dom.createElement('th'))
    cell.textContent = UI.utils.label(x, true) // Initial capital
    cell.subject = x
    cell.style = 'margin: 0.3em; padding: 0.5em 1em; font-treatment: bold; font-size: 120%;'

    const column = mainRow.appendChild(dom.createElement('td'))
    column.subject = x
    column.style = 'border: 0.01em solid white; padding: 0.1em; '

    function droppedURIHandler (uris) {
      uris.forEach(function (u) {
        console.log('Dropped on column: ' + u)
        const item = kb.sym(u)
        options.columnDropHandler(item, x)
      })
    }

    if (options.columnDropHandler) {
      UI.widgets.makeDropTarget(column, droppedURIHandler)
    }
  })

  /* Each item on the board
   * normally App will override this
  */
  function defaultRenderItem (item, category) {
    const card = dom.createElement('div')
    const table = card.appendChild(dom.createElement('table'))
    const classes = kb.each(item, ns.rdf('type'))
    const catColors = classes.map(cat => kb.any(cat, ns.ui('backgroundColor'))).filter(c => c)

    table.appendChild(UI.widgets.personTR(dom, null, item))
    table.subject = item
    table.style = 'margin: 1em;' // @@ use style.js
    const backgroundColor = catColors[0] || kb.any(category, ns.ui('backgroundColor'))
    card.style.backgroundColor = backgroundColor ? backgroundColor.value : '#fff'
    return card
  }

  function sortedBy (values, predicate, defaultSortValue, reverse) {
    var toBeSorted = values.map(x => [kb.any(x, predicate) || defaultSortValue, x])
    toBeSorted.sort()
    if (reverse) toBeSorted.reverse() // @@ check
    return toBeSorted.map(pair => pair[1])
  }
  board.refresh = function () {
    const now = new $rdf.Literal(new Date())
    const actualRenderItem = renderItem || options.renderItem || defaultRenderItem
    function localRenderItem (subject) {
      const ele = actualRenderItem(subject)
      UI.widgets.makeDraggable(ele, subject)
      ele.subject = subject
      return ele
    }
    for (var col = mainRow.firstChild; col; col = col.nextSibling) {
      const category = col.subject
      const items = kb.each(null, ns.rdf('type'), category)
      const sortBy = options.sortBy || ns.dct('created')
      const sortedItems = sortedBy(items, sortBy, now, true)
      UI.utils.syncTableToArrayReOrdered(col, sortedItems, localRenderItem)
    }
  }

  // kb.query(query, addCellFromBindings, undefined, whenDone) // Populate the board
  board.refresh()
  return board
}
