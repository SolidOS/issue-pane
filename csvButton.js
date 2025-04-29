// A Button to copy the state of the tracker in CSV format
// Comma-separated Values
//
// Yes this mixes the layers but that is not all bad if it gets it in one file
// one can look at 

import { icons, ns, utils, widgets } from 'solid-ui'
import { store } from 'solid-logic'

const TestCSVstring = 'A,B,C\n1,2,3\n4,5,6\nfoo,bar,baz\n'

export function quoteString(value) {
  // https://www.rfc-editor.org/rfc/rfc4180
  const stripped = value.replaceAll('\n', ' ')
  if (!stripped.includes(',')) {
    return stripped
  }  // If contains comma then put in quotes and double up internal quotes
  const quoted = '"' + stripped.replaceAll('"', '""') + '"'
  console.log('Quoted:  >>>' + quoted + '<<<')
  const check  = quoted.slice(1,-1).replaceAll('""', '') 
  if (check.includes('"')) throw new Error('CSV inconsistecy')
  return quoted
}

export function csvText(store, tracker)  {

  function columnText(task, column) {
    let thing
    if (column.predicate)  {
      thing = store.any(task, column.predicate)
      return thing? thing.value : '--'
    }
    else if (column.category)  {
      const types = store.each(task, ns.rdf('type'))
      for (const t of types) {
        // console.log('@@ checking subclass type: ', t, ' category: ', column.category )
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
            + '\n'
  }
  const stateStore = store.any(tracker, ns.wf('stateStore'))
  const tasks = store.each(null, ns.wf('tracker'), tracker, stateStore)
  console.log('  CSV: Tasks:', tasks.length)

  const columns = [
    
    { label: 'Name',  predicate: ns.dc('title')  },
  /*  { label: 'Description',  predicate: ns.wf('description')  }, */

/*    { label: 'State', category: ns.wf('Task') }
      */
] 
  const states = store.any(tracker, ns.wf('issueClass')) // Main states are subclasses of this class
  console.log('  CSV: States - main superclass:', states)
  const stateColumn = { label: 'State', category: states} // better than  'task'
  console.log('  CSV: found column from state', stateColumn)
  columns.push(stateColumn) 

  const categories = store.each(tracker, ns.wf('issueCategory'))
  console.log('  CSV: Categories : ', categories )
  console.log('  CSV: Categories : length: ', categories.length)
  console.log('  CSV: Categories : first: ', categories[0])

  const classifications = categories
  for (const c of classifications){
    const column = { label: utils.label(c), category: c}
    console.log('  CSV: found column from classifications', column)
    columns.push(column) // Classes are different
  }

  // const propertyList = ns.wf('propertyList')
  const form = store.any(tracker, ns.wf('extrasEntryForm'), null, null)
  console.log('  CSV: Form : ', form )

  if (form) {
    const parts = store.any(form, ns.ui('parts'), null, form.doc())
    console.log('  CSV: parts : ', parts )

    const fields = parts.elements
    console.log('  CSV: fields : ', fields )

    for (const field of fields) {
      const prop = store.any(field,ns.ui('property'))
      const lab = utils.label(prop)
      const column = {label: lab, predicate: prop}
      console.log('  CSV: found column from form', column)
      columns.push(column)
    }
  }
  // Put description  on the end as it can be long
  columns.push({ label: 'Description',  predicate: ns.wf('description') })
  console.log('Columns: ', columns.length)
  const header = columns.map(col => col.label).join(',') + '\n'
  console.log('CSV: Header= ', header)
  // Order tasks?? By Creation date? By Status?
  const body = tasks.map(taskLine).join('')
  return header + body
}

export function csvButton (dom, tracker) {
  const wrapper = dom.createElement('div')
  // Add a button
  const button = widgets.button(dom, icons.iconBase + 'noun_Document_998605.svg',
    'Copy as CSV', async event => {

      const div = button.parentNode.parentNode
      console.log('button gparent div', div)
      div.addEventListener('copy', event => {
          alert ('Copy caught');
          const csv = csvText(store, tracker);
          const csv1 = TestCSVstring
          event.clipboardData.setData("text/plain", csv);
          event.clipboardData.setData("text/csv", csv);
          alert ('Copy data: ' + csv)
          event.preventDefault();
      })

      var copyEvent = new ClipboardEvent('copy');
      if (!copyEvent) {
        alert('CSV: Copy event failed.')
      } else if (!copyEvent.clipboardData){
        alert('CSV: Copy event no clipboardData')
      } else {
        copyEvent.clipboardData.items.add(csv, 'text/csv');
        copyEvent.clipboardData.items.add(csv, 'text/plain');
        dom.dispatchEvent(copyEvent);
        alert('Copy dispatched.')
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event
        // t's possible to construct and dispatch a synthetic copy event,
        // but this will not affect the system clipboard.
      }
      event.preventDefault()
    })

  wrapper.appendChild(button)
  return wrapper
}

