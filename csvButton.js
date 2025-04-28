// A Button to copy the state of the tracker in CSV format
// Comma-separated Values
//
// Yes this mixes the layers but that is not all bad if it gets it in one file
// one can look at 

import { icons, ns, utils, widgets } from 'solid-ui'
import { store } from 'solid-logic'

export function quoteString(value) {
  // https://www.rfc-editor.org/rfc/rfc4180
  const stripped = value.replace('\n', ' ')
  if (!stripped.includes(',')) {
    return stripped
  }  // If contains comma then put in quotes and double up internal quotes
  return '"' + stripped.replace('"', '""') + '"'
}

export function csvText(store, tracker)  {

  function columnText(task, column) {
    let thing
    if (column.predicate)  {
      thing = store.any(task, column.predicate)
    }
    else if (column.category)  {
      const types = store.each(task, ns.rdf('type'))
      for (const t of types) {
        console.log('@@ checking subclass type: ', t, ' category: ', column.category )
        if (store.holds(t, ns.rdfs('subClassOf'), column.category)){
          thing = t
        }
      }
      if (!thing) return '?' + utils.label(column.category) // @@
      if (!thing) throw new Error('wot no class of category ', column.category)
    } else {
      throw new Error('wot no pred or cat', column)
    }
    return utils.label(thing)
  }

  function taskLine(task) {
    return columns.map(column => columnText(task, column))
        .map(quoteString)
        .join(',')
            + '/n'
  }
  const stateStore = store.any(tracker, ns.wf('stateStore'))
  const tasks = store.each(null, ns.wf('tracker'), tracker, stateStore)

  let columns = [
    /*  like:
    { label: 'Name',    predicate: ns.dct('title')  },
    { label: 'State', category: ns.wf('Task') }
      */
] 
  const states = store.any(tracker, ns.wf('issueClass')) // Main states are subclasses of this class
  console.log('  CSV: States - main superclass:', states)

  const categories = store.each(tracker, ns.wf('issueCategory'))
  console.log('  CSV: Categories : ', categories )
  console.log('  CSV: Categories : length: ', categories.length)
  console.log('  CSV: Categories : first: ', categories[0])

  const classifications = [states].concat(categories)
  for (const c of classifications){
    const column = { label: utils.label(c), category: c}
    console.log('  CSV: found column from classifications', column)
    columns.push(column) // Classes are different
  }

  // const propertyList = ns.wf('propertyList')
  const form = store.any(tracker, ns.wf('extrasEntryForm'), null, tracker.doc())
  if (form) {
    const parts = store.any(form, ns.ui('parts'), null, form.doc())
    const fields = parts.elements
    for (const field of fields) {
      const prop = store.any(field,ns.ui('property'))
      const lab = utils.label(prop)
      const column = {label: lab, predicate: prop}
      console.log('  CSV: found column from form', column)
      columns.push(column)
    }
  }
  const header = columns.map(col => col.label).join(',') + '\n'
  // Order tasks?? By Creation date? By Status?
  const body = tasks.map(taskLine)
  return header + body
}

export function csvButton (dom, tracker) {
  const wrapper = dom.createElement('div')
  // Add a button
  const button = widgets.button(dom, icons.iconBase + 'noun_479395.svg',
    'Copy as CSV', async _event => {
      const csv = csvText(store, tracker)
      var copyEvent = new ClipboardEvent('copy');
      copyEvent.clipboardData.items.add(csv, 'text/csv');
      copyEvent.clipboardData.items.add(csv, 'text/plain');
      dom.dispatchEvent(copyEvent);
      alert('Copy dispatched.')
    })

  wrapper.appendChild(button)
  return wrapper
}

