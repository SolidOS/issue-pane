//  Form to collect data about a New Issue
//
import * as UI from 'solid-ui'

const $rdf = UI.rdf
const ns = UI.ns

export function newIssueForm (dom, kb, tracker, superIssue, showNewIssue) {
  var form = dom.createElement('div') // form is broken as HTML behaviour can resurface on js error
  var stateStore = kb.any(tracker, ns.wf('stateStore'))

  var timestring = function () {
    var now = new Date()
    return '' + now.getTime()
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
  }

  var sendNewIssue = function () {
    titlefield.setAttribute('class', 'pendingedit')
    titlefield.disabled = true
    var sts = []
    var issue

    var expandTemplate = function (template) {
      const now = new $rdf.Literal(new Date())
      const nnnn = '' + new Date().getTime()
      const YYYY = now.value.slice(0, 4)
      var MM = now.value.slice(5, 7)
      var DD = now.value.slice(8, 10)
      return template
        .replace('{N}', nnnn)
        .replace('{YYYY}', YYYY)
        .replace('{MM}', MM)
        .replace('{DD}', DD)
    }
    // Where to store the new issue?
    var template = kb.anyValue(tracker, ns.wf('issueURITemplate'))
    var issueDoc
    if (template) {
      // Does each issue do in its own file?
      template = $rdf.uri.join(template, stateStore.uri) // Template is relative
      issue = kb.sym(expandTemplate(template))
    } else {
      issue = kb.sym(stateStore.uri + '#' + 'Iss' + timestring())
    }
    issueDoc = issue.doc()

    // Basic 9 core predicates are stored in the main stateStore

    var title = kb.literal(titlefield.value)
    sts.push(new $rdf.Statement(issue, ns.wf('tracker'), tracker, stateStore))
    sts.push(new $rdf.Statement(issue, ns.dc('title'), title, stateStore))
    sts.push(
      new $rdf.Statement(issue, ns.dct('created'), new Date(), stateStore)
    )
    var initialStates = kb.each(tracker, ns.wf('initialState'))
    if (initialStates.length === 0) { console.log('This tracker has no initialState') }
    for (var i = 0; i < initialStates.length; i++) {
      sts.push(
        new $rdf.Statement(
          issue,
          ns.rdf('type'),
          initialStates[i],
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

    var sendComplete = function (uri, success, body) {
      if (!success) {
        console.log("Error: can't save new issue:" + body)
      } else {
        form.parentNode.removeChild(form)
        showNewIssue(issue)
      }
    }
    kb.updater.update([], sts, sendComplete)
  }

  var states = kb.any(tracker, ns.wf('issueClass'))
  var classLabel = UI.utils.label(states)
  form.innerHTML =
    '<h2>Add new ' +
    (superIssue ? 'sub ' : '') +
    classLabel +
    '</h2><p>Title of new ' +
    classLabel +
    ':</p>'
  var titlefield = dom.createElement('input')
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
  return form
}
