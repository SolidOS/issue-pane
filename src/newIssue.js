//  Form to collect data about a New Issue
//
import { ns, utils } from 'solid-ui'
import * as $rdf from 'rdflib'

export function newIssueForm (dom, kb, tracker, superIssue, showNewIssue) {
  const form = dom.createElement('div') // form is broken as HTML behaviour can resurface on js error
  const stateStore = kb.any(tracker, ns.wf('stateStore'))

  const timestring = function () {
    const now = new Date()
    return '' + now.getTime()
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
  }

  const sendNewIssue = function () {
    titlefield.setAttribute('class', 'pendingedit')
    titlefield.disabled = true
    const sts = []

    const expandTemplate = function (template) {
      const now = new $rdf.Literal(new Date())
      const nnnn = '' + new Date().getTime()
      const YYYY = now.value.slice(0, 4)
      const MM = now.value.slice(5, 7)
      const DD = now.value.slice(8, 10)
      return template
        .replace('{N}', nnnn)
        .replace('{YYYY}', YYYY)
        .replace('{MM}', MM)
        .replace('{DD}', DD)
    }
    // Where to store the new issue?
    const template = kb.anyValue(tracker, ns.wf('issueURITemplate'))
    const issue = template
      // Does each issue do in its own file?
      ? kb.sym(expandTemplate($rdf.uri.join(template, stateStore.uri)))
      : kb.sym(stateStore.uri + '#' + 'Iss' + timestring())

    const issueDoc = issue.doc()

    // Basic 9 core predicates are stored in the main stateStore

    const title = kb.literal(titlefield.value)
    sts.push(new $rdf.Statement(issue, ns.wf('tracker'), tracker, stateStore))
    sts.push(new $rdf.Statement(issue, ns.dc('title'), title, stateStore))
    sts.push(new $rdf.Statement(issue, ns.dct('created'), new Date(), stateStore))
    // Copy states from super issue as after all they are subtasks so initially same state same category
    const initialStates = superIssue
      ? kb.each(superIssue, ns.rdf('type'), null, superIssue.doc())
      : kb.each(tracker, ns.wf('initialState'))
    for (const state of initialStates) {
      sts.push(
        new $rdf.Statement(
          issue,
          ns.rdf('type'),
          state,
          stateStore
        )
      )
    }
    if (superIssue) {
      sts.push(
        new $rdf.Statement(superIssue, ns.wf('dependent'), issue, stateStore)
      )
    }

    // Other things are stores in the individual
    if (template) {
      sts.push(new $rdf.Statement(issue, ns.wf('tracker'), tracker, issueDoc))
      sts.push(
        new $rdf.Statement(issue, ns.rdfs('seeAlso'), stateStore, issueDoc)
      )
    }

    const sendComplete = function (uri, success, body) {
      if (!success) {
        console.log('Error: can\'t save new issue:' + body)
      } else {
        form.parentNode.removeChild(form)
        showNewIssue(issue)
      }
    }
    kb.updater.update([], sts, sendComplete)
  }

  const states = kb.any(tracker, ns.wf('issueClass'))
  const classLabel = utils.label(states)
  form.innerHTML =
    '<h2>Add new ' +
    (superIssue ? 'sub ' : '') +
    classLabel +
    '</h2><p>Title of new ' +
    classLabel +
    ':</p>'
  const titlefield = dom.createElement('input')
  titlefield.setAttribute('type', 'text')
  titlefield.setAttribute(
    'style',
    'margin: 0.5em; font-size: 100%; padding: 0.3em;'
  )
  titlefield.setAttribute('size', '100')
  titlefield.setAttribute('maxLength', '2048') // No arbitrary limits
  titlefield.select() // focus next user input
  titlefield.addEventListener(
    'keyup',
    function (e) {
      if (e.keyCode === 13) {
        sendNewIssue()
      }
    },
    false
  )
  form.appendChild(titlefield)
  titlefield.focus() // we want user cursor here
  return form
}
