// A Button to copy the state of the tracker in CSV format
// Comma-separated Values
//
// Yes this mixes the layers but that is not all bad if it gets it in one file
// one can look at

import { icons, ns, utils, widgets } from 'solid-ui'
import { store } from 'solid-logic'
import { alertDialog } from './localUtils'
import * as debug from './debug'

export function quoteString (value) {
  // https://www.rfc-editor.org/rfc/rfc4180
  const stripped = value.replaceAll('\n', ' ')
  if (!stripped.includes(',')) {
    return stripped
  }  // If contains comma then put in quotes and double up internal quotes
  const quoted = '"' + stripped.replaceAll('"', '""') + '"'
  const check = quoted.slice(1, -1).replaceAll('""', '')
  if (check.includes('"')) {
    debug.error(`quoteString failed to quote properly, value: ${value}, quoted: ${quoted}, check: ${check}`)
    throw new Error('CSV inconsistecy')
  }
  return quoted
}

export function csvText (store, tracker) {
  function columnText (task, column) {
    let thing
    if (column.predicate) {
      thing = store.any(task, column.predicate)
      return thing ? thing.value : '--'
    } else if (column.category) {
      const types = store.each(task, ns.rdf('type'))
      for (const t of types) {
        if (store.holds(t, ns.rdfs('subClassOf'), column.category)) {
          thing = t
        }
      }
      if (!thing) return '?' + utils.label(column.category) // Missing cat OK
      // if (!thing) throw new Error('wot no class of category ', column.category)
    } else {
      debug.error('column has no predicate or category', column)
      throw new Error('Column has no predicate or category.')
    }
    return utils.label(thing)
  }

  function taskLine (task) {
    return columns.map(column => columnText(task, column))
      .map(quoteString)
      .join(',') + '\n'
  }
  const stateStore = store.any(tracker, ns.wf('stateStore'))
  const tasks = store.each(null, ns.wf('tracker'), tracker, stateStore)

  const columns = [

    { label: 'Name', predicate: ns.dc('title') },
    /*  { label: 'Description',  predicate: ns.wf('description')  }, */

    /*    { label: 'State', category: ns.wf('Task') }
      */
  ]
  const states = store.any(tracker, ns.wf('issueClass')) // Main states are subclasses of this class
  const stateColumn = { label: 'State', category: states } // better than  'task'
  columns.push(stateColumn)

  const categories = store.each(tracker, ns.wf('issueCategory'))

  const classifications = categories
  for (const c of classifications) {
    const column = { label: utils.label(c), category: c }
    columns.push(column) // Classes are different
  }

  // const propertyList = ns.wf('propertyList')
  const form = store.any(tracker, ns.wf('extrasEntryForm'), null, null)

  if (form) {
    const parts = store.any(form, ns.ui('parts'), null, form.doc())

    const fields = parts.elements

    for (const field of fields) {
      const prop = store.any(field, ns.ui('property'))
      if (prop) {
        const lab = utils.label(prop)
        const column = { label: lab, predicate: prop }
        columns.push(column)
      }
    }
  }
  // Put description  on the end as it can be long
  columns.push({ label: 'Description', predicate: ns.wf('description') })
  const header = columns.map(col => col.label).join(',') + '\n'
  // Order tasks?? By Creation date? By Status?
  const body = tasks.map(taskLine).join('')
  return header + body
}

export function csvButton (dom, tracker) {
  const wrapper = dom.createElement('div')
  // Add a button
  const button = widgets.button(dom, icons.iconBase + 'noun_Document_998605.svg',
    'Copy as CSV', async _event => {
      const div = button.parentNode.parentNode
      div.addEventListener('copy', event => {
        // alert ('Copy caught');
        let csv
        try {
          csv = csvText(store, tracker)
        } catch (err) {
          alertDialog('Could not generate CSV. Please check tracker data and try again.', 'CSV export error', dom)
          event.preventDefault()
          return
        }
        event.preventDefault()
        event.clipboardData.setData('text/plain', csv)
        event.clipboardData.setData('text/csv', csv)
        alertDialog('CSV data copied to clipboard.', 'CSV export', dom)
      })
    })

  wrapper.appendChild(button)
  return wrapper
}
