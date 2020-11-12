// All the UI for a single issue, without store load or listening for changes
//
import { authn, icons, messageArea, ns, rdf, store, style, utils, widgets } from 'solid-ui'
import { newIssueForm } from './newIssue'

const $rdf = rdf
const kb = store

const SET_MODIFIED_DATES = false

function complain (message, context) {
  console.warn(message)
  context.paneDiv.appendChild(widgets.errorMessageBlock(context.dom, message))
}

export function getState (issue, classification) {
  const tracker = kb.the(issue, ns.wf('tracker'), null, issue.doc())
  const states = kb.any(tracker, ns.wf('issueClass'))
  classification = classification || states
  const types = kb.each(issue, ns.rdf('type'))
    .filter(ty => kb.holds(ty, ns.rdfs('subClassOf'), classification))
  if (types.length !== 1) {
    // const initialState = kb.any(tracker, ns.wf('initialState')) No do NOT default
    // if (initialState) return initialState
    throw new Error('Issue must have one type as state: ' + types.length)
  }
  return types[0]
}

export function renderIssueCard (issue, context) {
  function getBackgroundColor () {
    const classes = kb.each(issue, ns.rdf('type')) // @@ pick cats in order then state
    const catColors = classes.map(cat => kb.any(cat, ns.ui('backgroundColor'))).filter(c => !!c)

    if (catColors.length) return catColors[0].value // pick first one
    return null
  }
  function refresh () {
    const backgroundColor = getBackgroundColor() || 'white'
    card.style.backgroundColor = backgroundColor
    editButton.style.backgroundColor = backgroundColor // Override white from style sheet
  }
  const dom = context.dom
  const uncategorized = !getBackgroundColor() // This is a suspect issue. Prompt to delete it

  const card = dom.createElement('div')
  const table = card.appendChild(dom.createElement('table'))
  table.style.width = '100%'
  const options = { draggable: false } // Let the baord make th ewhole card draggable
  table.appendChild(widgets.personTR(dom, null, issue, options))
  table.subject = issue
  card.style = 'border-radius: 0.4em; border: 0.05em solid grey; margin: 0.3em;'

  const img = card.firstChild.firstChild.firstChild.firstChild // div/table/tr/td/img
  img.setAttribute('src', icons.iconBase + 'noun_Danger_1259514.svg') // override
  // Add a button for viewing the whole issue in overlay
  const buttonsCell = card.firstChild.firstChild.children[2] // right hand part of card
  const editButton = widgets.button(dom, icons.iconBase + 'noun_253504.svg', 'edit', async _event => {
    exposeOverlay(issue, context)
  })
  const editButtonImage = editButton.firstChild
  editButtonImage.style.width = editButtonImage.style.height = '1.5em'
  buttonsCell.appendChild(editButton)

  // If uncategorized, shortcut to delete issue
  if (uncategorized) {
    const deleteButton = widgets.deleteButtonWithCheck(dom, buttonsCell, 'issue', async function () { // noun?
      try {
        await kb.updater.update(kb.connectedStatements(issue))
      } catch (err) {
        complain(`Unable to delete issue: ${err}`, context)
      }
      console.log('User deleted issue ' + issue)
      card.parentNode.removeChild(card) // refresh doesn't work yet because it is not passed though tabs so short cut
      widgets.refreshTree(context.paneDiv) // Should delete the card if nec when tabs pass it though
      // complain('DELETED OK', context)
    })
    buttonsCell.appendChild(deleteButton)
  }
  card.style.maxWidth = '24em' // @@ User adjustable??
  card.refresh = refresh
  refresh()
  return card
}

export function exposeOverlay (subject, context) {
  function hideOverlay () {
    overlay.innerHTML = '' // clear overlay
    overlay.style.visibility = 'hidden'
  }
  const overlay = context.overlay
  overlay.innerHTML = '' // clear existing
  const button = overlay.appendChild(
    widgets.button(context.dom, icons.iconBase + 'noun_1180156.svg', 'close', hideOverlay))
  button.style.float = 'right'
  button.style.margin = '0.7em'
  delete button.style.backgroundColor // do not want white
  overlay.style.visibility = 'visible'
  overlay.appendChild(renderIssue(subject, context))
  overlay.firstChild.style.overflow = 'auto' // was scroll
}

export function renderIssue (issue, context) {
  // Don't bother changing the last modified dates of things: save time
  function setModifiedDate (subj, kb, doc) {
    if (SET_MODIFIED_DATES) {
      if (!getOption(tracker, 'trackLastModified')) return
      let deletions = kb.statementsMatching(issue, ns.dct('modified'))
      deletions = deletions.concat(
        kb.statementsMatching(issue, ns.wf('modifiedBy'))
      )
      const insertions = [$rdf.st(issue, ns.dct('modified'), new Date(), doc)]
      if (me) insertions.push($rdf.st(issue, ns.wf('modifiedBy'), me, doc))
      kb.updater.update(deletions, insertions, function (_uri, _ok, _body) {})
    }
  }

  function say (message, style) {
    const pre = dom.createElement('pre')
    pre.setAttribute('style', style || 'color: grey')
    issueDiv.appendChild(pre)
    pre.appendChild(dom.createTextNode(message))
    return pre
  }

  const timestring = function () {
    const now = new Date()
    return '' + now.getTime()
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
  }

  function complain (message) {
    console.warn(message)
    issueDiv.appendChild(widgets.errorMessageBlock(dom, message))
  }

  function complainIfBad (ok, body) {
    if (!ok) {
      complain(
        'Sorry, failed to save your change:\n' + body,
        'background-color: pink;', context
      )
    }
  }
  function getOption (tracker, option) {
    // eg 'allowSubIssues'
    const opt = kb.any(tracker, ns.ui(option))
    return !!(opt && opt.value)
  }

  function setPaneStyle () {
    const types = kb.findTypeURIs(issue)
    let mystyle = 'padding: 0.5em 1.5em 1em 1.5em; '
    let backgroundColor = null
    for (const uri in types) {
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
  const tracker = kb.the(issue, ns.wf('tracker'), null, issue.doc())
  if (!tracker) throw new Error('No tracker')
  const stateStore = kb.any(tracker, ns.wf('stateStore'))
  const store = issue.doc()

  const issueDiv = dom.createElement('div')
  var me = authn.currentUser()

  setPaneStyle()

  authn.checkUser() // kick off async operation

  const states = kb.any(tracker, ns.wf('issueClass'))
  if (!states) { throw new Error('This tracker ' + tracker + ' has no issueClass') }
  const select = widgets.makeSelectForCategory(
    dom,
    kb,
    issue,
    states,
    stateStore,
    function (ok, body) {
      if (ok) {
        setModifiedDate(store, kb, store)
        widgets.refreshTree(issueDiv)
      } else {
        console.log('Failed to change state:\n' + body)
      }
    }
  )
  issueDiv.appendChild(select)

  const cats = kb.each(tracker, ns.wf('issueCategory')) // zero or more
  for (let i = 0; i < cats.length; i++) {
    issueDiv.appendChild(
      widgets.makeSelectForCategory(
        dom,
        kb,
        issue,
        cats[i],
        stateStore,
        function (ok, body) {
          if (ok) {
            setModifiedDate(store, kb, store)
            widgets.refreshTree(issueDiv)
          } else {
            console.log('Failed to change category:\n' + body)
          }
        }
      )
    )
  }

  // For when issue is the main solo subject, include link to tracker itself.
  const a = dom.createElement('a')
  a.setAttribute('href', tracker.uri)
  a.setAttribute('style', 'float:right')
  issueDiv.appendChild(a).textContent = utils.label(tracker)
  a.addEventListener('click', widgets.openHrefInOutlineMode, true)

  // Main Form for Title, description only
  const coreIssueFormText = `
    @prefix : <http://www.w3.org/ns/ui#> .
    @prefix core: <http://www.w3.org/2005/01/wf/flow#>.
    @prefix dc: <http://purl.org/dc/elements/1.1/>.
    @prefix wf: <http://www.w3.org/2005/01/wf/flow#> .

    core:coreIsueForm     a :Form;
         <http://purl.org/dc/elements/1.1/title> "Core issue data";
         :parts  (
        core:titleField
        core:descriptionField ) .

    core:descriptionField     a :MultiLineTextField;
         :label "Description";
         :property wf:description;
         :size "40" .

    core:titleField     a :SingleLineTextField;
         :label "Title";
         :maxLength "128";
         :property dc:title; # @@ Should move to dct or schema
         :size "40" .

    wf:Task     :creationForm core:coreIsueForm .
`
  const CORE_ISSUE_FORM = ns.wf('coreIsueForm')
  $rdf.parse(coreIssueFormText, kb, CORE_ISSUE_FORM.doc().uri, 'text/turtle')
  widgets.appendForm(
    dom,
    issueDiv,
    {},
    issue,
    CORE_ISSUE_FORM,
    stateStore,
    complainIfBad
  )

  // Descriptions can be long and are stored local to the issue
  /*
  issueDiv.appendChild(
    widgets.makeDescription(
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
  ) */

  // Assigned to whom?

  const assignments = kb.statementsMatching(issue, ns.wf('assignee'))
  if (assignments.length > 1) {
    say('Weird, was assigned to more than one person. Fixing ..')
    const deletions = assignments.slice(1)
    kb.updater.update(deletions, [], function (uri, ok, body) {
      if (ok) {
        say('Now fixed.')
      } else {
        complain('Fixed failed: ' + body, context)
      }
    })
  }

  // Who could be assigned to this?
  // Anyone assigned to any issue we know about

  async function getPossibleAssignees () {
    let devs = []
    const devGroups = kb.each(issue, ns.wf('assigneeGroup'))
    for (let i = 0; i < devGroups.length; i++) {
      const group = devGroups[i]
      await kb.fetcher.load()
      devs = devs.concat(kb.each(group, ns.vcard('member')))
    }
    // Anyone who is a developer of any project which uses this tracker
    const proj = kb.any(null, ns.doap('bug-database'), tracker) // What project?
    if (proj) {
      await kb.fetcher.load(proj)
      devs = devs.concat(kb.each(proj, ns.doap('developer')))
    }
    return devs
  }

  // Super issues first - like parent directories .. maybe use breadcrums from?? @@
  function renderSubIssue (issue) {
    const options = { link: false }
    return widgets.personTR(dom, ns.wf('dependent'), issue, options)
  }

  getPossibleAssignees().then(devs => {
    if (devs.length) {
      devs.forEach(function (person) {
        kb.fetcher.lookUpThing(person)
      }) // best effort async for names etc
      const opts = {
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
        widgets.makeSelectForOptions(
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

  /*  The trees of super issues and subissues
  */
  let subIssuePanel
  if (getOption(tracker, 'allowSubIssues')) {
    if (!subIssuePanel) {
      subIssuePanel = issueDiv.appendChild(dom.createElement('div'))
      subIssuePanel.style = 'margin: 1em; padding: 1em;'
    }

    subIssuePanel.appendChild(dom.createElement('h4')).textContent = 'Super Issues'
    const listOfSupers = subIssuePanel.appendChild(dom.createElement('div'))
    listOfSupers.refresh = function () {
      utils.syncTableToArrayReOrdered(listOfSupers, kb.each(null, ns.wf('dependent'), issue), renderSubIssue)
    }
    listOfSupers.refresh()

    // Sub issues
    subIssuePanel.appendChild(dom.createElement('h4')).textContent = 'Sub Issues'
    const listOfSubs = subIssuePanel.appendChild(dom.createElement('div'))
    listOfSubs.refresh = function () {
      utils.syncTableToArrayReOrdered(listOfSubs, kb.each(issue, ns.wf('dependent')), renderSubIssue)
    }
    listOfSubs.refresh()

    const b = dom.createElement('button')
    b.setAttribute('type', 'button')
    subIssuePanel.appendChild(b)
    const classLabel = utils.label(states)
    b.innerHTML = 'New sub ' + classLabel
    b.setAttribute('style', 'float: right; margin: 0.5em 1em;')
    b.addEventListener(
      'click',
      function (_event) {
        subIssuePanel.insertBefore(newIssueForm(dom, kb, tracker, issue, listOfSubs.refresh), b.nextSibling) // Pop form just after button
      },
      false
    )
  }

  issueDiv.appendChild(dom.createElement('br'))

  // Extras are stored centrally to the tracker
  const extrasForm = kb.any(tracker, ns.wf('extrasEntryForm'))
  if (extrasForm) {
    widgets.appendForm(
      dom,
      issueDiv,
      {},
      issue,
      extrasForm,
      stateStore,
      complainIfBad
    )
  }

  //   Comment/discussion area

  const spacer = issueDiv.appendChild(dom.createElement('tr'))
  spacer.setAttribute('style', 'height: 1em') // spacer and placeHolder

  const template = kb.anyValue(tracker, ns.wf('issueURITemplate'))
  /*
  var chatDocURITemplate = kb.anyValue(tracker, ns.wf('chatDocURITemplate')) // relaive to issue
  var chat
  if (chatDocURITemplate) {
    let template = $rdf.uri.join(chatDocURITemplate, issue.uri) // Template is relative to issue
    chat = kb.sym(expandTemplate(template))
  } else
  */
  let messageStore
  if (template) {
    messageStore = issue.doc() // for now. Could go deeper
  } else {
    messageStore = kb.any(tracker, ns.wf('messageStore'))
    if (!messageStore) messageStore = kb.any(tracker, ns.wf('stateStore'))
    kb.sym(messageStore.uri + '#' + 'Chat' + timestring()) // var chat =
  }

  kb.fetcher.nowOrWhenFetched(messageStore, function (ok, body, _xhr) {
    if (!ok) {
      const er = dom.createElement('p')
      er.textContent = body // @@ use nice error message
      issueDiv.insertBefore(er, spacer)
    } else {
      const discussion = messageArea(dom, kb, issue, messageStore)
      issueDiv.insertBefore(discussion, spacer)
    }
  })

  // Draggable attachment list
  const attachmentHint = issueDiv.appendChild(dom.createElement('div'))
  attachmentHint.innerHTML = `<h4>Attachments</h4>
    <p>Drag files, emails,
    web pages onto the paper clip, or click the file upload button.</p>`
  let uploadFolderURI
  if (issue.uri.endsWith('/index.ttl#this')) { // This has a whole folder to itself
    uploadFolderURI = issue.uri.slice(0, 14) + 'Files/' // back to slash
  } else { // like state.ttl#Iss1587852322438
    uploadFolderURI = issue.dir().uri + 'Files/' + issue.uri.split('#')[1] + '/' // New folder for issue in file with others
  }
  widgets.attachmentList(dom, issue, issueDiv, {
    doc: stateStore,
    promptIcon: icons.iconBase + 'noun_25830.svg',
    uploadFolder: kb.sym(uploadFolderURI), // Allow local files to be uploaded
    predicate: ns.wf('attachment')
  })

  // Delete button to delete the issue
  const deleteButton = widgets.deleteButtonWithCheck(dom, issueDiv, 'issue', async function () {
    try {
      await kb.updater.update(kb.connectedStatements(issue))
    } catch (err) {
      complain(`Unable to delete issue: ${err}`, context)
    }
    // @@ refreshTree
    complain('DELETED OK', context)
    issueDiv.style.backgroundColor = '#eee'
    issueDiv.style.fontColor = 'orange'
  })
  deleteButton.style.float = 'right'

  // Refresh button
  const refreshButton = dom.createElement('button')
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
      widgets.refreshTree(issueDiv)
    },
    false
  )
  refreshButton.setAttribute('style', style.button)
  issueDiv.appendChild(refreshButton)
  return issueDiv
} // renderIssue
