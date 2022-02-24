/*   Issue Tracker Pane
 **
 **  This solid view allows a user to interact with an issue tracker, or individual issue,
 ** to change its state according to an ontology, comment on it, etc.
 **
 */

import * as UI from 'solid-ui'
import { board } from './board' // @@ will later be in solid-UI
import { renderIssue, renderIssueCard, getState, exposeOverlay } from './issue'
import { newTrackerButton } from './newTracker'
import { newIssueForm } from './newIssue'
import { trackerSettingsFormText } from './trackerSettingsForm.js'
// import { trackerInstancesFormText } from './trackerInstancesForm.js'

const $rdf = UI.rdf
const ns = UI.ns
const kb = UI.store
const widgets = UI.widgets

// const MY_TRACKERS_ICON = UI.icons.iconBase + 'noun_Document_998605.svg'
// const TRACKER_ICON = UI.icons.iconBase + 'noun_list_638112'
// const TASK_ICON = UI.icons.iconBase + 'noun_17020.svg'

const OVERFLOW_STYLE = 'position: fixed; z-index: 100; top: 1.51em; right: 2em; left: 2em; bottom:1.5em; border: 0.1em grey; overflow: scroll;'
export default {
  icon: UI.icons.iconBase + 'noun_122196.svg', // was: js/panes/issue/tbl-bug-22.png
  // noun_list_638112 is a checklist document
  // noun_Document_998605.svg is a stack of twpo checklists
  // noun_97839.svg is a ladybug
  // noun_122196.svg is a clipboard with a check list on it
  // noun_17020.svg is a single check box
  name: 'issue',

  audience: [], // Anyone.   was [ns.solid('PowerUser')]

  // Does the subject deserve an issue pane?
  label: function (subject, _context) {
    const t = kb.findTypeURIs(subject)
    if (
      t['http://www.w3.org/2005/01/wf/flow#Task'] ||
      kb.holds(subject, UI.ns.wf('tracker'))
    ) { return 'issue' } // in case ontology not available
    if (t['http://www.w3.org/2005/01/wf/flow#Tracker']) return 'tracker'
    // Later: Person. For a list of things assigned to them,
    // open bugs on projects they are developer on, etc
    return null // No under other circumstances (while testing at least!)
  },

  mintClass: ns.wf('Tracker'),

  mintNew: async function (context, options) {
    /** Perform updates on more than one document   @@ Move to rdflib!
    */
    async function updateMany (deletions, insertions) {
      const docs = deletions.concat(insertions).map(st => st.why)
      const uniqueDocs = Array.from(new Set(docs))
      const updates = uniqueDocs.map(doc =>
        kb.updater.update(deletions.filter(st => st.why.sameTerm(doc)),
          insertions.filter(st => st.why.sameTerm(doc))))
      return Promise.all(updates)
    }

    const kb = context.session.store
    const ns = UI.ns
    let stateStore
    if (options.newInstance) {
      stateStore = kb.sym(options.newInstance.doc().uri + '_state.ttl')
    } else {
      options.newInstance = kb.sym(options.newBase + 'index.ttl#this')
      stateStore = kb.sym(options.newBase + 'state.ttl')
    }
    const tracker = options.newInstance
    const appDoc = tracker.doc()

    const me = UI.authn.currentUser()
    if (me) {
      kb.add(tracker, ns.dc('author'), me, appDoc)
    }

    kb.add(tracker, ns.rdf('type'), ns.wf('Tracker'), appDoc)
    kb.add(tracker, ns.dc('created'), new Date(), appDoc)

    // @@ to do --- adk user what sort of tracker they want

    kb.add(tracker, ns.wf('issueClass'), ns.wf('Task'), appDoc) // @@ ask user
    kb.add(tracker, ns.wf('initialState'), ns.wf('Open'), appDoc)
    kb.add(tracker, ns.wf('stateStore'), stateStore, appDoc)
    kb.add(tracker, ns.wf('assigneeClass'), ns.foaf('Person'), appDoc) // @@ set to people in the meeting?

    kb.add(tracker, ns.wf('stateStore'), stateStore, stateStore) // Back Link

    const ins = kb.statementsMatching(undefined, undefined, undefined, appDoc).concat(kb.statementsMatching(undefined, undefined, undefined, stateStore))
    try {
      await updateMany([], ins)
    } catch (err) {
      return UI.widgets.complain(context, 'Error writing tracker configuration: ' + err)
    }
    /*
    try {
      await kb.updater.updateMany([], kb.statementsMatching(undefined, undefined, undefined, stateStore))
    } catch (err) {
      return UI.widgets.complain(context, 'Error writing tracker state file: ' + err)
    }
*/
    const dom = context.dom
    const div = options.div

    const notice = div.appendChild(dom.createElement('div'))
    notice.innerHTML = `<h4>Success</h4>
    <p>Your <a href="${tracker.uri}">new tracker</a> has been made.
    Use the settings tab to configure it.
    </p>
    `
    // console.log('New tracker created ' + tracker)
    // alert('New tracker created')
    return options
  },

  render: function (subject, context) {
    const dom = context.dom

    const paneDiv = dom.createElement('div')
    context.paneDiv = paneDiv
    paneDiv.setAttribute('class', 'issuePane')

    function complain (message) {
      console.warn(message)
      paneDiv.appendChild(UI.widgets.errorMessageBlock(dom, message))
    }

    function complainIfBad (ok, message) {
      if (!ok) {
        complain(message)
      }
    }

    /** Infer subclass from disjoint Union
    **
    ** This is would not be needed if our quey language
    ** allowed is to query ardf Collection membership.
    */
    async function fixSubClasses (kb, tracker) {
      async function checkOneSuperclass (klass) {
        const collection = kb.any(klass, ns.owl('disjointUnionOf'), null, doc)
        if (!collection) throw new Error(`Classification ${klass} has no disjointUnionOf`)
        if (!collection.elements) throw new Error(`Classification ${klass} has no array`)
        const needed = new Set(collection.elements.map(x => x.uri))
        const existing = new Set(kb.each(null, ns.rdfs('subClassOf'), klass, doc)
          .map(x => x.uri))
        const superfluous = existing.filter(sub => !needed.has(sub))
        const deleteActions = superfluous.map(sub => { return { action: 'delete', st: $rdf.st(kb.sym(sub), ns.rdfs('subClassOf'), klass, doc) } })
        /*
        for (const sub of existing) {
          if (!needed.has(sub)) {
            deletables.push($rdf.st(kb.sym(sub), ns.rdfs('subClassOf'), klass, doc))
          }
        }
        */
        const missing = needed.filter(sub => !existing.has(sub))
        const insertActions = missing.ma(sub => { return { action: 'insert', st: $rdf.st(kb.sym(sub), ns.rdfs('subClassOf'), klass, doc) } })
        /*
        for (const sub of needed) {
          if (!existing.has(sub)) {
            insertables.push($rdf.st(kb.sym(sub), ns.rdfs('subClassOf'), klass, doc))
          }
        }
        */
        return deleteActions.concat(insertActions)
      }
      const doc = tracker.doc()
      const states = kb.any(tracker, ns.wf('issueClass'))
      const cats = kb.each(tracker, ns.wf('issueCategory')).concat([states])
      let damage = [] // to make totally functionaly  need to deal with map over async.
      for (const klass of cats) {
        damage = await damage.concat(checkOneSuperclass(klass))
      }
      if (damage.length) {
        const insertables = damage.filter(fix => fix.action === 'insert').map(fix => fix.st)
        const deletables = damage.filter(fix => fix.action === 'delete').map(fix => fix.st)
        // alert(`Internal error: s${damage} subclasses inconsistences!`)
        console.log('Damage:', damage)
        if (confirm(`Fix ${damage} inconsistent subclasses in tracker config?`)) {
          await kb.updater.update(deletables, insertables)
        }
      }
    }

    /** /////////////////////////// Board
    */
    function renderBoard (tracker, klass) {
      const states = kb.any(tracker, ns.wf('issueClass'))
      klass = klass || states // default to states
      const doingStates = klass.sameTerm(states)

      // These are states we will show by default: the open issues.
      const stateArray = kb.any(klass, ns.owl('disjointUnionOf'))
      if (!stateArray) {
        return complain(`Configuration error: state ${states} does not have substates`)
      }
      let columnValues = stateArray.elements
      if (doingStates && columnValues.length > 2 // and there are more than two
      ) { // strip out closed states
        columnValues = columnValues.filter(state => kb.holds(state, ns.rdfs('subClassOf'), ns.wf('Open')) || state.sameTerm(ns.wf('Open')))
      }

      async function columnDropHandler (issue, newState) {
        const currentState = getState(issue, klass)
        const tracker = kb.the(issue, ns.wf('tracker'), null, issue.doc())
        const stateStore = kb.any(tracker, ns.wf('stateStore'))

        if (newState.sameTerm(currentState)) {
          // alert('Same state ' + UI.utils.label(currentState)) // @@ remove
          return
        }
        try {
          await kb.updater.update(
            [$rdf.st(issue, ns.rdf('type'), currentState, stateStore)],
            [$rdf.st(issue, ns.rdf('type'), newState, stateStore)])
        } catch (err) {
          UI.widgets.complain(context, 'Unable to change issue state: ' + err)
        }
        boardDiv.refresh() // reorganize board to match the new reality
      }

      function isOpen (issue) {
        const types = kb.findTypeURIs(issue)
        return !!types[ns.wf('Open').uri]
      }

      const options = { columnDropHandler, filter: doingStates ? null : isOpen }
      options.sortBy = ns.dct('created')
      options.sortReverse = true
      function localRenderIssueCard (issue) {
        return renderIssueCard(issue, context)
      }
      // const columnValues = states // @@ optionally selected states would work
      const boardDiv = board(dom, columnValues, localRenderIssueCard, options)
      return boardDiv
    }

    /** ////////////// Table
    */
    function tableRefreshButton (stateStore, tableDiv) {
      const refreshButton = widgets.button(dom, UI.icons.iconBase + 'noun_479395.svg',
        'refresh table', async _event => {
          try {
            await kb.fetcher.load(stateStore, { force: true, clearPreviousData: true })
          } catch (err) {
            alert(err)
            return
          }
          UI.widgets.refreshTree(tableDiv)
        })
      return refreshButton
    }

    function renderTable (tracker) {
      function newOptionalClause () {
        const clause = new $rdf.IndexedFormula()
        query.pat.optional.push(clause)
        return clause
      }
      const states = kb.any(subject, ns.wf('issueClass'))
      const cats = kb.each(tracker, ns.wf('issueCategory')) // zero or more
      const vars = ['issue', 'state', 'created']
      const query = new $rdf.Query(UI.utils.label(subject))
      for (let i = 0; i < cats.length; i++) {
        vars.push('_cat_' + i)
      }
      const v = {} // The RDF variable objects for each variable name
      vars.forEach(function (x) {
        query.vars.push((v[x] = $rdf.variable(x)))
      })
      query.pat.add(v.issue, ns.wf('tracker'), tracker)
      // query.pat.add(v['issue'], ns.dc('title'), v['title'])
      query.pat.add(v.issue, ns.dct('created'), v.created)
      query.pat.add(v.issue, ns.rdf('type'), v.state)
      query.pat.add(v.state, ns.rdfs('subClassOf'), states)

      query.pat.optional = []

      for (let i = 0; i < cats.length; i++) {
        const clause = newOptionalClause()
        clause.add(v.issue, ns.rdf('type'), v['_cat_' + i])
        clause.add(v['_cat_' + i], ns.rdfs('subClassOf'), cats[i])
      }

      const propertyList = kb.any(tracker, ns.wf('propertyList')) // List of extra properties
      if (propertyList) {
        const properties = propertyList.elements
        for (let p = 0; p < properties.length; p++) {
          const prop = properties[p]
          let vname = '_prop_' + p
          if (prop.uri.indexOf('#') >= 0) {
            vname = prop.uri.split('#')[1]
          }
          const oneOpt = newOptionalClause()
          query.vars.push((v[vname] = $rdf.variable(vname)))
          oneOpt.add(v.issue, prop, v[vname])
        }
      }

      const selectedStates = {}
      const possible = kb.each(undefined, ns.rdfs('subClassOf'), states)
      possible.forEach(function (s) {
        if (
          kb.holds(s, ns.rdfs('subClassOf'), ns.wf('Open')) ||
          s.sameTerm(ns.wf('Open'))
        ) {
          selectedStates[s.uri] = true
          // console.log('on '+s.uri); // @@
        }
      })

      function exposeThisOverlay (href) {
        const subject = $rdf.sym(href)
        exposeOverlay(subject, context)
      }

      const tableDiv = UI.table(dom, {
        query: query,
        keyVariable: '?issue', // Charactersic of row
        sortBy: '?created', // By default, sort by date
        sortReverse: true, //   most recent at the top
        hints: {
          '?issue': { linkFunction: exposeThisOverlay, label: 'Title' },
          '?created': { cellFormat: 'shortDate' },
          '?state': { initialSelection: selectedStates, label: 'Status' }
        }
      })
      const stateStore = kb.any(subject, ns.wf('stateStore'))
      tableDiv.appendChild(tableRefreshButton(stateStore, tableDiv))
      return tableDiv
    }

    // Allow user to create new things within the folder
    function renderCreationControl (refreshTarget) {
      const creationDiv = dom.createElement('div')
      const me = UI.authn.currentUser()
      const creationContext = {
        // folder: subject,
        div: creationDiv,
        dom: dom,
        noun: 'tracker',
        statusArea: creationDiv,
        me: me,
        refreshTarget: refreshTarget
      }
      const issuePane = context.session.paneRegistry.byName('issue')
      const relevantPanes = [issuePane]
      UI.create.newThingUI(creationContext, context, relevantPanes) // Have to pass panes down  newUI
      return creationDiv
    }

    function renderInstances (theClass) {
      const instancesDiv = dom.createElement('div')
      const context = { dom, div: instancesDiv, noun: 'tracker' }
      UI.authn.registrationList(context, { public: true, private: true, type: theClass }).then(_context2 => {
        instancesDiv.appendChild(renderCreationControl(instancesDiv))
        /* // keep this code in case we need a form
        const InstancesForm = ns.wf('TrackerInstancesForm')
        const text = trackerInstancesFormText
        $rdf.parse(text, kb, InstancesForm.doc().uri, 'text/turtle')
        widgets.appendForm(dom, instancesDiv, {}, tracker, InstancesForm,
          tracker.doc(), complainIfBad)
        */
      })
      return instancesDiv
    }
    function renderSettings (tracker) {
      const settingsDiv = dom.createElement('div')
      // A registration control allows the to record this tracker in their type index
      const context = { dom, div: settingsDiv, noun: 'tracker' }
      UI.authn.registrationControl(context, tracker, ns.wf('Tracker')).then(_context2 => {
        const settingsForm = ns.wf('TrackerSettingsForm')
        const text = trackerSettingsFormText
        $rdf.parse(text, kb, settingsForm.doc().uri, 'text/turtle')
        widgets.appendForm(dom, settingsDiv, {}, tracker, settingsForm,
          tracker.doc(), complainIfBad)
      })
      return settingsDiv
    }

    function renderTabsTableAndBoard () {
      function renderMain (ele, object) {
        ele.innerHTML = '' // Clear out "loading message"
        if (object.sameTerm(boardView)) {
          ele.appendChild(renderBoard(tracker))
        } else if (object.sameTerm(tableView)) {
          ele.appendChild(renderTable(tracker))
        } else if (object.sameTerm(settingsView)) {
          ele.appendChild(renderSettings(tracker))
        } else if (object.sameTerm(instancesView)) {
          ele.appendChild(renderInstances(ns.wf('Tracker')))
        } else if ((kb.holds(tracker, ns.wf('issueCategory'), object)) ||
                   (kb.holds(tracker, ns.wf('issueClass'), object))) {
          ele.appendChild(renderBoard(tracker, object))
        } else {
          throw new Error('Unexpected tab type: ' + object)
        }
      }
      const states = kb.any(tracker, ns.wf('issueClass'))
      const items = [instancesView, tableView, states]
        .concat(kb.each(tracker, ns.wf('issueCategory')))
      items.push(settingsView)
      const selectedTab = tableView
      const options = { renderMain, items, selectedTab }

      // Add stuff to the ontologies which we believe but they don't say
      const doc = instancesView.doc()
      kb.add(instancesView, ns.rdfs('label'), 'My Trackers', doc) // @@ squatting on wf ns
      kb.add(settingsView, ns.rdfs('label'), 'Settings', doc) // @@ squatting on wf ns
      kb.add(states, ns.rdfs('label'), 'By State', doc) // @@ squatting on wf ns

      const tabs = UI.tabs.tabWidget(options)
      return tabs
    }

    async function renderTracker () {
      function showNewIssue (issue) {
        UI.widgets.refreshTree(paneDiv)
        exposeOverlay(issue, context)
        b.disabled = false // https://stackoverflow.com/questions/41176582/enable-disable-a-button-in-pure-javascript
      }
      tracker = subject

      try {
        await fixSubClasses(kb, tracker)
      } catch (err) {
        console.log('@@@ Error fixing subclasses in config: ' + err)
      }

      const states = kb.any(subject, ns.wf('issueClass'))
      if (!states) throw new Error('This tracker has no issueClass')
      const stateStore = kb.any(subject, ns.wf('stateStore'))
      if (!stateStore) throw new Error('This tracker has no stateStore')

      UI.authn.checkUser() // kick off async operation

      const h = dom.createElement('h2')
      h.setAttribute('style', 'font-size: 150%')
      paneDiv.appendChild(h)
      const classLabel = UI.utils.label(states)
      h.appendChild(dom.createTextNode(classLabel + ' list')) // Use class label @@I18n

      // New Issue button
      const b = dom.createElement('button')
      const container = dom.createElement('div')
      b.setAttribute('type', 'button')
      b.setAttribute('style', 'padding: 0.3em; font-size: 100%; margin: 0.5em;')
      container.appendChild(b)
      paneDiv.appendChild(container)
      const img = dom.createElement('img')
      img.setAttribute('src', UI.icons.iconBase + 'noun_19460_green.svg')
      img.setAttribute('style', 'width: 1em; height: 1em; margin: 0.2em;')
      b.appendChild(img)
      const span = dom.createElement('span')
      span.innerHTML = 'New ' + classLabel
      b.appendChild(span)
      b.addEventListener(
        'click',
        function (_event) {
          b.disabled = true
          container.appendChild(newIssueForm(dom, kb, tracker, null, showNewIssue))
        },
        false
      )

      // Table of issues - when we have the main issue list
      // We also need the ontology loaded
      //
      context.session.store.fetcher
        .load([stateStore])
        .then(function (_xhrs) {
          const tableDiv = renderTabsTableAndBoard(tracker)
          // const tableDiv = renderTable(tracker) // was
          paneDiv.appendChild(tableDiv)

          if (tableDiv.refresh) {
            // Refresh function
          } else {
            console.log('No table refresh function?!')
          }
          paneDiv.appendChild(newTrackerButton(subject))
          updater.addDownstreamChangeListener(stateStore, tableDiv.refresh) // Live update
        })
        .catch(function (err) {
          return console.log('Cannot load state store: ' + err)
        })
      // end of Tracker instance
    } // render tracker

    /* Render tabs with both views
    */
    const boardView = ns.wf('BoardView')
    const tableView = ns.wf('TableView')
    const settingsView = ns.wf('SettingsView')
    const instancesView = ns.wf('InstancesView')

    const updater = kb.updater
    const t = kb.findTypeURIs(subject)
    let tracker

    // Whatever we are rendering, lets load the ontology
    const flowOntology = UI.ns.wf('').doc()
    if (!kb.holds(undefined, undefined, undefined, flowOntology)) {
      // If not loaded already
      $rdf.parse(require('./wf.js'), kb, flowOntology.uri, 'text/turtle') // Load ontology directly
    }
    const userInterfaceOntology = UI.ns.ui('').doc()
    if (!kb.holds(undefined, undefined, undefined, userInterfaceOntology)) {
      // If not loaded already
      $rdf.parse(require('./ui.js'), kb, userInterfaceOntology.uri, 'text/turtle') // Load ontology directly
    }

    // Render a single issue
    if (
      t['http://www.w3.org/2005/01/wf/flow#Task'] ||
      kb.holds(subject, UI.ns.wf('tracker'))
    ) {
      tracker = kb.any(subject, ns.wf('tracker'))
      if (!tracker) throw new Error('This issue ' + subject + 'has no tracker')

      // Much data is in the tracker instance, so wait for the data from it

      context.session.store.fetcher
        .load(tracker.doc())
        .then(function (_xhrs) {
          const stateStore = kb.any(tracker, ns.wf('stateStore'))
          context.session.store.fetcher.nowOrWhenFetched(
            stateStore,
            subject,
            function drawIssuePane2 (ok, body) {
              if (!ok) {
                return console.log(
                  'Failed to load state ' + stateStore + ' ' + body
                )
              }
              paneDiv.appendChild(renderIssue(subject, context))
              updater.addDownstreamChangeListener(stateStore, function () {
                UI.widgets.refreshTree(paneDiv)
              }) // Live update
            }
          )
        })
        .catch(err => {
          const msg = 'Failed to load config ' + tracker.doc() + ' ' + err
          return complain(msg)
        })
      context.session.store.fetcher.nowOrWhenFetched(
        tracker.doc(),
        subject,
        function drawIssuePane1 (ok, body) {
          if (!ok) {
            return console.log(
              'Failed to load config ' + tracker.doc() + ' ' + body
            )
          }
        }
      ) // End nowOrWhenFetched tracker

      // /////////////////////////////////////////////////////////
      //
      //          Render a Tracker instance
      //
    } else if (t['http://www.w3.org/2005/01/wf/flow#Tracker']) {
      renderTracker().then(() => console.log('Tracker rendered'))
    } else {
      console.log(
        'Error: Issue pane: No evidence that ' +
          subject +
          ' is either a bug or a tracker.'
      )
    }

    let loginOutButton
    const overlay = paneDiv.appendChild(dom.createElement('div'))
    context.overlay = overlay
    overlay.style = OVERFLOW_STYLE
    overlay.style.visibility = 'hidden'

    UI.authn.checkUser().then(webId => {
      if (webId) {
        console.log('Web ID set already: ' + webId)
        context.me = webId
        // @@ enable things
        return
      }

      loginOutButton = UI.authn.loginStatusBox(dom, webIdUri => {
        if (webIdUri) {
          context.me = kb.sym(webIdUri)
          console.log('Web ID set from login button: ' + webIdUri)
          paneDiv.removeChild(loginOutButton)
          // enable things
        } else {
          context.me = null
        }
      })

      loginOutButton.setAttribute('style', 'margin: 0.5em 1em;')
      paneDiv.appendChild(loginOutButton)
      if (!context.statusArea) {
        context.statusArea = paneDiv.appendChild(dom.createElement('div'))
      }
    })

    return paneDiv
  }
}

// ends
