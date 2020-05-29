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

const $rdf = UI.rdf
const ns = UI.ns
const kb = UI.store

const OVERFLOW_STYLE = 'position: fixed; top: 1.51em; right: 2em; left: 2em; bottom:1.5em; border: 0.1em grey; overflow: scroll;'
export default {
  icon: UI.icons.iconBase + 'noun_97839.svg', // was: js/panes/issue/tbl-bug-22.png

  name: 'issue',

  audience: [ns.solid('PowerUser')],

  // Does the subject deserve an issue pane?
  label: function (subject, _context) {
    var t = kb.findTypeURIs(subject)
    if (
      t['http://www.w3.org/2005/01/wf/flow#Task'] ||
      kb.holds(subject, UI.ns.wf('tracker'))
    ) { return 'issue' } // in case ontology not available
    if (t['http://www.w3.org/2005/01/wf/flow#Tracker']) return 'tracker'
    // Later: Person. For a list of things assigned to them,
    // open bugs on projects they are developer on, etc
    return null // No under other circumstances (while testing at least!)
  },

  render: function (subject, context) {
    const dom = context.dom

    var paneDiv = dom.createElement('div')
    context.paneDiv = paneDiv
    paneDiv.setAttribute('class', 'issuePane')

    function complain (message) {
      console.warn(message)
      paneDiv.appendChild(UI.widgets.errorMessageBlock(dom, message))
    }

    /** /////////////////////////// Board
    */
    function renderBoard (tracker) {
      const states = kb.any(tracker, ns.wf('issueClass'))
      var cats = kb.each(tracker, ns.wf('issueCategory')) // pick one @@

      var query = new $rdf.Query(UI.utils.label(subject))
      var vars = ['issue', 'state', 'created']
      for (let i = 0; i < cats.length; i++) {
        vars.push('_cat_' + i)
      }
      var v = {} // The RDF variable objects for each variable name
      vars.map(function (x) {
        query.vars.push((v[x] = $rdf.variable(x)))
      })
      query.pat.add(v.issue, ns.wf('tracker'), tracker)
      query.pat.add(v.issue, ns.dct('created'), v.created)
      query.pat.add(v.issue, ns.rdf('type'), v.state)
      query.pat.add(v.state, ns.rdfs('subClassOf'), states)
      for (let i = 0; i < cats.length; i++) {
        query.pat.add(v.issue, ns.rdf('type'), v['_cat_' + i])
        query.pat.add(v['_cat_' + i], ns.rdfs('subClassOf'), cats[i])
      }

      query.pat.optional = []

      var propertyList = kb.any(tracker, ns.wf('propertyList')) // List of extra properties
      if (propertyList) {
        var properties = propertyList.elements
        for (var p = 0; p < properties.length; p++) {
          var prop = properties[p]
          var vname = '_prop_' + p
          if (prop.uri.indexOf('#') >= 0) {
            vname = prop.uri.split('#')[1]
          }
          var oneOpt = new $rdf.IndexedFormula()
          query.pat.optional.push(oneOpt)
          query.vars.push((v[vname] = $rdf.variable(vname)))
          oneOpt.add(v.issue, prop, v[vname])
        }
      }
      // These are states we will show by default: the open issues.
      var selectedStates = {}
      var columnValues = []
      var possible = kb.each(undefined, ns.rdfs('subClassOf'), states) // @@ Use ordered not unordered
      possible.map(function (s) {
        if (
          kb.holds(s, ns.rdfs('subClassOf'), ns.wf('Open')) ||
          s.sameTerm(ns.wf('Open'))
        ) {
          selectedStates[s.uri] = true
          columnValues.push(s)
        }
      })

      async function columnDropHandler (issue, newState) {
        const currentState = getState(issue)
        const tracker = kb.the(issue, ns.wf('tracker'), null, issue.doc())
        const stateStore = kb.any(tracker, ns.wf('stateStore'))

        if (newState.sameTerm(currentState)) {
          alert('Same state ' + UI.utils.label(currentState)) // @@ remove
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

      var options = { columnDropHandler }
      options.sortBy = ns.dct('created')
      options.sortReverse = true
      function localRenderIssueCard (issue) {
        return renderIssueCard(issue, context)
      }
      // const columnValues = states // @@ optionally selected states would work
      const boardDiv = board(dom, query, columnValues, localRenderIssueCard, v.state, v.issue, options)
      return boardDiv
    }

    /** ////////////// Table
    */
    function renderTable (tracker) {
      const states = kb.any(subject, ns.wf('issueClass'))
      var cats = kb.each(tracker, ns.wf('issueCategory')) // zero or more
      var vars = ['issue', 'state', 'created']
      var query = new $rdf.Query(UI.utils.label(subject))
      for (let i = 0; i < cats.length; i++) {
        vars.push('_cat_' + i)
      }
      var v = {} // The RDF variable objects for each variable name
      vars.map(function (x) {
        query.vars.push((v[x] = $rdf.variable(x)))
      })
      query.pat.add(v.issue, ns.wf('tracker'), tracker)
      // query.pat.add(v['issue'], ns.dc('title'), v['title'])
      query.pat.add(v.issue, ns.dct('created'), v.created)
      query.pat.add(v.issue, ns.rdf('type'), v.state)
      query.pat.add(v.state, ns.rdfs('subClassOf'), states)
      for (let i = 0; i < cats.length; i++) {
        query.pat.add(v.issue, ns.rdf('type'), v['_cat_' + i])
        query.pat.add(v['_cat_' + i], ns.rdfs('subClassOf'), cats[i])
      }

      query.pat.optional = []

      var propertyList = kb.any(tracker, ns.wf('propertyList')) // List of extra properties
      if (propertyList) {
        var properties = propertyList.elements
        for (var p = 0; p < properties.length; p++) {
          var prop = properties[p]
          var vname = '_prop_' + p
          if (prop.uri.indexOf('#') >= 0) {
            vname = prop.uri.split('#')[1]
          }
          var oneOpt = new $rdf.IndexedFormula()
          query.pat.optional.push(oneOpt)
          query.vars.push((v[vname] = $rdf.variable(vname)))
          oneOpt.add(v.issue, prop, v[vname])
        }
      }

      var selectedStates = {}
      var possible = kb.each(undefined, ns.rdfs('subClassOf'), states)
      possible.map(function (s) {
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

      var tableDiv = UI.table(dom, {
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
      return tableDiv
    }

    /* Rander tabs with both views
    */
    const boardView = ns.wf('BoardView')
    const tableView = ns.wf('TableView')
    function renderTabsTableAndBoard () {
      function renderMain (ele, object) {
        ele.innerHTML = '' // Clear out "loading message"
        if (object.sameTerm(boardView)) {
          ele.appendChild(renderBoard(tracker))
        } else if (object.sameTerm(tableView)) {
          ele.appendChild(renderTable(tracker))
        } else {
          throw new Error('Unexecpected tab type: ' + object)
        }
      }
      const options = {
        renderMain: renderMain,
        items: [tableView, boardView] // must use rdf terms
      }
      const tabs = UI.tabs.tabWidget(options)
      return tabs
    }

    function renderTracker () {
      function showNewIssue (issue) {
        UI.widgets.refreshTree(paneDiv)
        exposeOverlay(issue, context)
        b.setAttribute('disabled', false)
      }
      tracker = subject

      var states = kb.any(subject, ns.wf('issueClass'))
      if (!states) throw new Error('This tracker has no issueClass')
      var stateStore = kb.any(subject, ns.wf('stateStore'))
      if (!stateStore) throw new Error('This tracker has no stateStore')

      UI.authn.checkUser() // kick off async operation

      var h = dom.createElement('h2')
      h.setAttribute('style', 'font-size: 150%')
      paneDiv.appendChild(h)
      var classLabel = UI.utils.label(states)
      h.appendChild(dom.createTextNode(classLabel + ' list')) // Use class label @@I18n

      // New Issue button
      var b = dom.createElement('button')
      var container = dom.createElement('div')
      b.setAttribute('type', 'button')
      b.setAttribute('style', 'padding: 0.3em; font-size: 100%; margin: 0.5em;')
      container.appendChild(b)
      paneDiv.appendChild(container)
      var img = dom.createElement('img')
      img.setAttribute('src', UI.icons.iconBase + 'noun_19460_green.svg')
      img.setAttribute('style', 'width: 1em; height: 1em; margin: 0.2em;')
      b.appendChild(img)
      var span = dom.createElement('span')
      span.innerHTML = 'New ' + classLabel
      b.appendChild(span)
      b.addEventListener(
        'click',
        function (_event) {
          b.setAttribute('disabled', 'true')
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
            var refreshButton = dom.createElement('button')
            refreshButton.textContent = 'refresh table'
            refreshButton.addEventListener(
              'click',
              async function (_event) {
                try {
                  await kb.fetcher.load(stateStore, { force: true, clearPreviousData: true })
                } catch (err) {
                  alert(err)
                  return
                }
                UI.widgets.refreshTree(tableDiv)
              },
              false
            )
            paneDiv.appendChild(refreshButton)
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

    const updater = kb.updater
    var t = kb.findTypeURIs(subject)
    var tracker
    // Whatever we are rendering, lets load the ontology
    var flowOntology = UI.ns.wf('').doc()
    if (!kb.holds(undefined, undefined, undefined, flowOntology)) {
      // If not loaded already
      $rdf.parse(require('./wf.js'), kb, flowOntology.uri, 'text/turtle') // Load ontology directly
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
          var stateStore = kb.any(tracker, ns.wf('stateStore'))
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
      // renderTracker()
      renderTracker()
    } else {
      console.log(
        'Error: Issue pane: No evidence that ' +
          subject +
          ' is either a bug or a tracker.'
      )
    }

    var loginOutButton
    const overlay = paneDiv.appendChild(dom.createElement('div'))
    context.overlay = overlay
    overlay.style = OVERFLOW_STYLE
    overlay.style.visibility = 'hidden'

    // var overlayPane = null // overlay.appendChild(dom.createElement('div')) // avoid stomping on style by pane

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
