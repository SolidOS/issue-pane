// All the UI for a single issue, without store load or listening for changes
//
import * as UI from 'solid-ui'
import { newIssueForm } from './newIssue'

const $rdf = UI.rdf
const ns = UI.ns
const kb = UI.store

const SET_MODIFIED_DATES = false

export function renderIssue (issue, context) {
  // Don't bother changing the last modified dates of things: save time
  function setModifiedDate (subj, kb, doc) {
    if (SET_MODIFIED_DATES) {
      if (!getOption(tracker, 'trackLastModified')) return
      var deletions = kb.statementsMatching(issue, ns.dct('modified'))
      deletions = deletions.concat(
        kb.statementsMatching(issue, ns.wf('modifiedBy'))
      )
      var insertions = [$rdf.st(issue, ns.dct('modified'), new Date(), doc)]
      if (me) insertions.push($rdf.st(issue, ns.wf('modifiedBy'), me, doc))
      kb.updater.update(deletions, insertions, function (_uri, _ok, _body) {})
    }
  }

  function say (message, style) {
    var pre = dom.createElement('pre')
    pre.setAttribute('style', style || 'color: grey')
    issueDiv.appendChild(pre)
    pre.appendChild(dom.createTextNode(message))
    return pre
  }

  var timestring = function () {
    var now = new Date()
    return '' + now.getTime()
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
  }

  function complain (message) {
    console.warn(message)
    issueDiv.appendChild(UI.widgets.errorMessageBlock(dom, message))
  }

  function complainIfBad (ok, body) {
    if (!ok) {
      complain(
        'Sorry, failed to save your change:\n' + body,
        'background-color: pink;'
      )
    }
  }
  function getOption (tracker, option) {
    // eg 'allowSubIssues'
    var opt = kb.any(tracker, ns.ui(option))
    return !!(opt && opt.value)
  }

  function setPaneStyle () {
    var types = kb.findTypeURIs(issue)
    var mystyle = 'padding: 0.5em 1.5em 1em 1.5em; '
    var backgroundColor = null
    for (var uri in types) {
      backgroundColor = kb.any(
        kb.sym(uri),
        kb.sym('http://www.w3.org/ns/ui#backgroundColor')
      )
      if (backgroundColor) break
    }
    backgroundColor = backgroundColor ? backgroundColor.value : '#eee' // default grey
    mystyle += 'background-color: ' + backgroundColor + '; '
    issueDiv.setAttribute('style', mystyle)
  }

  const dom = context.dom

  var outliner = context.getOutliner(dom)

  const tracker = kb.the(issue, ns.wf('tracker'), null, issue.doc())
  if (!tracker) throw new Error('No tracker')

  const issueDiv = dom.createElement('div')
  var predicateURIsDone = {}
  var donePredicate = function (pred) {
    predicateURIsDone[pred.uri] = true
  }
  donePredicate(ns.rdf('type'))
  donePredicate(ns.dc('title'))

  var me = UI.authn.currentUser()

  setPaneStyle()

  var stateStore = kb.any(tracker, ns.wf('stateStore'))
  var store = kb.sym(issue.uri.split('#')[0])

  UI.authn.checkUser() // kick off async operation

  var states = kb.any(tracker, ns.wf('issueClass'))
  if (!states) { throw new Error('This tracker ' + tracker + ' has no issueClass') }
  var select = UI.widgets.makeSelectForCategory(
    dom,
    kb,
    issue,
    states,
    stateStore,
    function (ok, body) {
      if (ok) {
        setModifiedDate(store, kb, store)
        UI.widgets.refreshTree(issueDiv)
      } else {
        console.log('Failed to change state:\n' + body)
      }
    }
  )
  issueDiv.appendChild(select)

  var cats = kb.each(tracker, ns.wf('issueCategory')) // zero or more
  for (var i = 0; i < cats.length; i++) {
    issueDiv.appendChild(
      UI.widgets.makeSelectForCategory(
        dom,
        kb,
        issue,
        cats[i],
        stateStore,
        function (ok, body) {
          if (ok) {
            setModifiedDate(store, kb, store)
            UI.widgets.refreshTree(issueDiv)
          } else {
            console.log('Failed to change category:\n' + body)
          }
        }
      )
    )
  }

  const a = dom.createElement('a')
  a.setAttribute('href', tracker.uri)
  a.setAttribute('style', 'float:right')
  issueDiv.appendChild(a).textContent = UI.utils.label(tracker)
  a.addEventListener('click', UI.widgets.openHrefInOutlineMode, true)
  donePredicate(ns.wf('tracker'))
  // Descriptions can be long and are stored local to the issue
  issueDiv.appendChild(
    UI.widgets.makeDescription(
      dom,
      kb,
      issue,
      ns.wf('description'),
      store,
      function (ok, body) {
        if (ok) setModifiedDate(store, kb, store)
        else console.log('Failed to change description:\n' + body)
      }
    )
  )
  donePredicate(ns.wf('description'))

  // Assigned to whom?

  var assignments = kb.statementsMatching(issue, ns.wf('assignee'))
  if (assignments.length > 1) {
    say('Weird, was assigned to more than one person. Fixing ..')
    var deletions = assignments.slice(1)
    kb.updater.update(deletions, [], function (uri, ok, body) {
      if (ok) {
        say('Now fixed.')
      } else {
        complain('Fixed failed: ' + body)
      }
    })
  }

  // Remaining properties
  var plist = kb.statementsMatching(issue)
  var qlist = kb.statementsMatching(undefined, undefined, issue)

  // Who could be assigned to this?
  // Anyone assigned to any issue we know about

  async function getPossibleAssignees () {
    var devs = []
    var devGroups = kb.each(issue, ns.wf('assigneeGroup'))
    for (let i = 0; i < devGroups.length; i++) {
      const group = devGroups[i]
      await kb.fetcher.load()
      devs = devs.concat(kb.each(group, ns.vcard('member')))
    }
    // Anyone who is a developer of any project which uses this tracker
    var proj = kb.any(null, ns.doap('bug-database'), tracker) // What project?
    if (proj) {
      await kb.fetcher.load(proj)
      devs = devs.concat(kb.each(proj, ns.doap('developer')))
    }
    return devs
  }

  getPossibleAssignees().then(devs => {
    if (devs.length) {
      devs.map(function (person) {
        kb.fetcher.lookUpThing(person)
      }) // best effort async for names etc
      var opts = {
        // 'mint': '** Add new person **',
        nullLabel: '(unassigned)'
        /* 'mintStatementsFun': function (newDev) {
          var sts = [ $rdf.st(newDev, ns.rdf('type'), ns.foaf('Person')) ]
          if (proj) sts.push($rdf.st(proj, ns.doap('developer'), newDev))
          return sts
        }
        */
      }
      issueDiv.appendChild(
        UI.widgets.makeSelectForOptions(
          dom,
          kb,
          issue,
          ns.wf('assignee'),
          devs,
          opts,
          store,
          function (ok, body) {
            if (ok) setModifiedDate(store, kb, store)
            else console.log('Failed to change assignee:\n' + body)
          }
        )
      )
    }
  })

  donePredicate(ns.wf('assignee'))

  if (getOption(tracker, 'allowSubIssues')) {
    // Sub issues
    issueDiv.appendChild(dom.createElement('h4')).textContent = 'Sub Issues'
    const listOfSubs = issueDiv.appendChild(dom.createElement('div'))
    listOfSubs.refresh = function () {
      UI.utils.syncTableToArrayReOrdered(listOfSubs, kb.each(issue, ns.wf('dependent')), UI.widgets.personTR)
    }
    listOfSubs.refresh()

    // Super issues
    issueDiv.appendChild(dom.createElement('h4')).textContent = 'Super Issues'
    const listOfSupers = issueDiv.appendChild(dom.createElement('div'))
    listOfSupers.refresh = function () {
      UI.utils.syncTableToArrayReOrdered(listOfSupers, kb.each(issue, ns.wf('dependent')), UI.widgets.personTR)
    }
    listOfSupers.refresh()

    donePredicate(ns.wf('dependent'))

    var b = dom.createElement('button')
    b.setAttribute('type', 'button')
    issueDiv.appendChild(b)
    var classLabel = UI.utils.label(states)
    b.innerHTML = 'New sub ' + classLabel
    b.setAttribute('style', 'float: right; margin: 0.5em 1em;')
    b.addEventListener(
      'click',
      function (_event) {
        issueDiv.appendAfter(newIssueForm(dom, kb, tracker, issue, listOfSubs.refresh), b) // Pop form just after button
      },
      false
    )
  }

  issueDiv.appendChild(dom.createElement('br'))

  if (getOption(tracker, 'allowSubIssues')) {
  }

  // Extras are stored centrally to the tracker
  var extrasForm = kb.any(tracker, ns.wf('extrasEntryForm'))
  if (extrasForm) {
    UI.widgets.appendForm(
      dom,
      issueDiv,
      {},
      issue,
      extrasForm,
      stateStore,
      complainIfBad
    )
    var fields = kb.each(extrasForm, ns.ui('part'))
    fields.map(function (field) {
      var p = kb.any(field, ns.ui('property'))
      if (p) {
        donePredicate(p) // Check that one off
      }
    })
  }

  //   Comment/discussion area

  var spacer = issueDiv.appendChild(dom.createElement('tr'))
  spacer.setAttribute('style', 'height: 1em') // spacer and placeHolder

  var template = kb.anyValue(tracker, ns.wf('issueURITemplate'))
  /*
  var chatDocURITemplate = kb.anyValue(tracker, ns.wf('chatDocURITemplate')) // relaive to issue
  var chat
  if (chatDocURITemplate) {
    let template = $rdf.uri.join(chatDocURITemplate, issue.uri) // Template is relative to issue
    chat = kb.sym(expandTemplate(template))
  } else
  */
  var messageStore
  if (template) {
    messageStore = issue.doc() // for now. Could go deeper
  } else {
    messageStore = kb.any(tracker, ns.wf('messageStore'))
    if (!messageStore) messageStore = kb.any(tracker, ns.wf('stateStore'))
    kb.sym(messageStore.uri + '#' + 'Chat' + timestring()) // var chat =
  }

  kb.fetcher.nowOrWhenFetched(messageStore, function (ok, body, _xhr) {
    if (!ok) {
      var er = dom.createElement('p')
      er.textContent = body // @@ use nice error message
      issueDiv.insertBefore(er, spacer)
    } else {
      var discussion = UI.messageArea(dom, kb, issue, messageStore)
      issueDiv.insertBefore(discussion, spacer)
    }
  })
  donePredicate(ns.wf('message'))

  // Draggable attachment list
  UI.widgets.attachmentList(dom, issue, issueDiv, {
    doc: stateStore,
    promptIcon: UI.icons.iconBase + 'noun_25830.svg',
    predicate: ns.wf('attachment')
  })
  donePredicate(ns.wf('attachment'))

  outliner.appendPropertyTRs(issueDiv, plist, false, function (pred, _inverse) {
    return !(pred.uri in predicateURIsDone)
  })
  outliner.appendPropertyTRs(issueDiv, qlist, true, function (pred, _inverse) {
    return !(pred.uri in predicateURIsDone)
  })

  var refreshButton = dom.createElement('button')
  refreshButton.textContent = 'refresh messages'
  refreshButton.addEventListener(
    'click',
    async function (_event) {
      try {
        await kb.fetcher.load(messageStore, { force: true, clearPreviousData: true })
      } catch (err) {
        alert(err)
        return
      }
      UI.widgets.refreshTree(issueDiv)
    },
    false
  )
  refreshButton.setAttribute('style', UI.style.button)
  issueDiv.appendChild(refreshButton)
  return issueDiv
} // renderIssue
