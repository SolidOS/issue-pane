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

export function board (dom, query, columnValues, renderItem, vx, vvalue,
  options, whenDone) {
  const board = dom.createElement('div')
  const table = dom.createElement('table')
  const headerRow = dom.createElement('tr')
  columnValues.forEach(x => {
    const cell = headerRow.appendChild(dom.createElement('th'))
    cell.subject = x
  })
  var columns = columnValues.map(v => {
    return v // @@ a RDF object ?
  })

  const mainRow = table.appendChild(dom.createElement('tr'))

  /* Each item on the board
   * nowmallyApp will override this
  */
  function defaultRenderItem (item) {
    const table = dom.createElement('table')
    UI.widgets.personTR(item)
    table.subject = item
    return table
  }

  function markOldCells () {
    mainRow.children.forEach(col => {
      col.children.forEach(ele => { ele.old = true })
    })
  }

  function clearOldCells () {
    mainRow.children.forEach(col => {
      for (let k = col.children.length - 1; k; k--) {
        if (col.children[k].old) {
          col.removeChild(col.children[k])
        }
      }
    })
  }

  function columnNumberFor (x1) {
    var xNT = x1.toNT() // xNT is a NT string
    var col = null
    // These are data columns (not headings)
    for (var i = 0; i < columns.length; i++) {
      if (columns[i] === xNT) {
        return i
      }

      if (
        (xNT > columns[i] && options.xDecreasing) ||
        (xNT < columns[i] && !options.xDecreasing)
      ) {
        columns = columns
          .slice(0, i)
          .concat([xNT])
          .concat(columns.slice(i))
        col = i
        break
      }
    }

    if (col === null) {
      col = columns.length
      columns.push(xNT)
      const td = mainRow.appendChiuld(dom.createElement('tr'))
      td.dataValueNT = xNT
    }
    return col
  }

  board.refresh = function () {
    markOldCells()
    kb.query(query, addCellFromBindings, undefined, clearOldCells)
  }

  var addCellFromBindings = function (bindings) {
    const x = bindings[vx]
    const value = bindings[vvalue]

    var colNo = columnNumberFor(x)
    var col = mainRow.children[colNo + 1] // number of Y axis headings
    // Need to see if cell is aready there

    const actualRenderItem = renderItem || defaultRenderItem
    const itemElement = actualRenderItem(x, value)
    itemElement.subject = value
    col.appendChild(itemElement) // @@ should refresh
  }

  if (options.set_x) {
    for (let k = 0; k < options.set_x.length; k++) {
      columnNumberFor(options.set_x[k])
    }
  }

  kb.query(query, addCellFromBindings, undefined, whenDone) // Populate the board

  return board
}
