// A Button to copy the state of the tracker in CSV format
// Comma-separated Values
//
import { icons, messageArea, ns, rdf, style, utils, widgets } from 'solid-ui'
import { authn, store } from 'solid-logic'
import { newIssueForm } from './newIssue'

const $rdf = rdf
const kb = store

export function csvText(store, tracker)  {
  function encode(value) {
    return value.replace('\n', ' ').replace(',', '\\,') // @@ check
  }
  function columnText(task, column) {
    let thing
    if (column.predicate)  {
      thing = store.any(task, predicate)
    }
    else if (column.category)  {
      types = store.each(task, ns.rdf('type'))
      for (t of types) {
        if (store.holds(t, ns.rdfs('subClassOf'), column.category){
          thing = t
        }
      }
      if (!thing) throw new Error('wot no category', column.category)
    } else {
      throw new Error('wot no pred or cat', column)
    }
    return label(thing)
  }

  function taskLine(task) {
    return columns.map(columnText)
        .map(encode)
        .join(',')
            + '/n'
  }
  const stateStore = kb.any(subject, ns.wf('stateStore'))
  const tasks = store.any(null, ns.wf('tracker'), tracker, stateStore)

  let columns = [
    /*
    {
      label: 'Name',    predicate: ns.dct('title')
    },
    {
      label: 'Created', predicate: ns.dct('created')
    },
    {
      label: 'Location', predicate: store.sym('http://www.w3.org/2002/12/cal/ical#location')
    }
      */
] 
  const states = kb.any(tracker, ns.wf('issueClass')) // Main states are subclasses of this class
  const categories = kb.each(tracker, ns.wf('issueCategory')) | []
  const classifications = [states ] + categories
  for (const c in classifications){
    const column = { label: label(c), category: c}
    console.log('  CSV: found column from classifications', column)
    columns.append(column) // Classes are different
  }

  const propertyList = ns.wf('propertyList')
  const form = store.any(tracker, ns.wf('extrasEntryForm'), null, tracker.doc())
  if (form) {
    const parts = store.any(form, ns.ui('parts'), null, form.doc())
    const fields = parts.elements
    for (field of fields) {
      const prop = store.any(field,ns.ui('property'))
      const lab = label(prop)
      const column = {label: lab, predicate: prop}
      console.log('  CSV: found column from form', column)
      columns.append(column)
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
      const csv = '' // @@ fill in with data
    
      var copyEvent = new ClipboardEvent('copy');
      copyEvent.clipboardData.items.add(csv, 'text/csv');
      copyEvent.clipboardData.items.add(csv, 'text/plain');
      dom.dispatchEvent(copyEvent);
      alert('Copy dispatched.')
    })

  wrapper.appendChild(button)

  // Make a button function to dump to clipboard

  return wrapper
}

