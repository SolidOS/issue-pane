//  Form to collect data about a New Issue
//
import { ns, utils } from 'solid-ui'
import * as $rdf from 'rdflib'
import './styles/newIssue.css'

export function newIssueForm (dom, kb, tracker, superIssue, showNewIssue, onCancel) {
  const form = dom.createElement('div') // form is broken as HTML behaviour can resurface on js error
  form.classList.add('trackerNewIssueForm')
  const stateStore = kb.any(tracker, ns.wf('stateStore'))
  onCancel = onCancel || function () {}

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
  const closeForm = function () {
    if (form.parentNode) {
      form.parentNode.removeChild(form)
    }
    onCancel()
  }

  const header = form.appendChild(dom.createElement('div'))
  header.classList.add('trackerNewIssueHeader')

  const heading = header.appendChild(dom.createElement('h2'))
  heading.textContent = 'Add new ' + (superIssue ? 'sub ' : '') + classLabel

  const closeButton = header.appendChild(dom.createElement('button'))
  closeButton.classList.add('trackerNewIssueCloseButton')
  closeButton.setAttribute('type', 'button')
  closeButton.setAttribute('aria-label', 'Close new issue form')
  closeButton.textContent = '×'
  closeButton.addEventListener('click', closeForm, false)

  const prompt = form.appendChild(dom.createElement('p'))
  prompt.textContent = 'Title of new ' + classLabel + ':'

  const titlefield = dom.createElement('input')
  titlefield.classList.add('trackerNewIssueTitleField')
  titlefield.setAttribute('type', 'text')
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
