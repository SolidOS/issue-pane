/*   Issue Tracker Pane
 **
 **  This outline pane allows a user to interact with an issue,
 ** to change its state according to an ontology, comment on it, etc.
 **
 **
 ** I am using in places single quotes strings like 'this'
 ** where internationalization ("i18n") is not a problem, and double quoted
 ** like "this" where the string is seen by the user and so I18n is an issue.
 **
 */
/* global confirm */

import * as UI from 'solid-ui'
import { board } from './board' // @@ will later be in solid-UI
import { renderIssue } from './issue'
import { newIssueForm } from './newIssue'

const $rdf = UI.rdf
const ns = UI.ns
const kb = UI.store

export default {
  icon: UI.icons.iconBase + 'noun_97839.svg', // was: js/panes/issue/tbl-bug-22.png

  name: 'issue',

  audience: [ns.solid('PowerUser')],

  // Does the subject deserve an issue pane?
  label: function (subject, context) {
    var kb = context.session.store
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
    // const kb = context.session.store
    var ns = UI.ns
    var WF = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#')
    // var DC = $rdf.Namespace('http://purl.org/dc/elements/1.1/')
    // var DCT = $rdf.Namespace('http://purl.org/dc/terms/')
    // var outliner = context.getOutliner(dom)

    var paneDiv = dom.createElement('div')
    paneDiv.setAttribute('class', 'issuePane')

    function complain (message) {
      console.warn(message)
      paneDiv.appendChild(UI.widgets.errorMessageBlock(dom, message))
    }

    var timestring = function () {
      var now = new Date()
      return '' + now.getTime()
      // http://www.w3schools.com/jsref/jsref_obj_date.asp
    }

    function hideOverlay () {
      overlay.innerHTML = '' // clear overlay
      overlay.style.visibility = 'hidden'
    }
    function exposeOverlay (subject) {
      overlay.innerHTML = '' // clear existing
      const button = overlay.appendChild(
        UI.widgets.button(dom, UI.icons.iconBase + 'noun_1180156.svg', 'close', hideOverlay))
      button.style.float = 'right'
      overlay.style.visibility = 'visible'
      overlay.appendChild(renderIssue(subject, context))
    }

    // ///////////////////// Reproduction: Spawn a new instance of this app

    var newTrackerButton = function (thisTracker) {
      var button = UI.authn.newAppInstance(dom, { noun: 'tracker' }, function (
        ws,
        base
      ) {
        var appPathSegment = 'issuetracker.w3.org' // how to allocate this string and connect to
        // console.log("Ready to make new instance at "+ws)
        var sp = UI.ns.space
        var kb = context.session.store

        if (!base) {
          base = kb.any(ws, sp('uriPrefix')).value
          if (base.slice(-1) !== '/') {
            $rdf.log.error(
              appPathSegment + ': No / at end of uriPrefix ' + base
            )
            base = base + '/'
          }
          base += appPathSegment + '/' + timestring() + '/' // unique id
          if (!confirm('Make new tracker at ' + base + '?')) {
            return
          }
        }

        var stateStore = kb.any(tracker, WF('stateStore'))
        var newStore = kb.sym(base + 'store.ttl')

        var here = thisTracker.doc()

        var oldBase = here.uri.slice(0, here.uri.lastIndexOf('/') + 1)

        var morph = function (x) {
          // Move any URIs in this space into that space
          if (x.elements !== undefined) return x.elements.map(morph) // Morph within lists
          if (x.uri === undefined) return x
          var u = x.uri
          if (u === stateStore.uri) return newStore // special case
          if (u.slice(0, oldBase.length) === oldBase) {
            u = base + u.slice(oldBase.length)
            $rdf.log.debug(' Map ' + x.uri + ' to ' + u)
          }
          return kb.sym(u)
        }
        var there = morph(here)
        var newTracker = morph(thisTracker)

        var myConfig = kb.statementsMatching(
          undefined,
          undefined,
          undefined,
          here
        )
        for (var i = 0; i < myConfig.length; i++) {
          var st = myConfig[i]
          kb.add(
            morph(st.subject),
            morph(st.predicate),
            morph(st.object),
            there
          )
        }

        // Keep a paper trail   @@ Revisit when we have non-public ones @@ Privacy
        //
        kb.add(newTracker, UI.ns.space('inspiration'), thisTracker, stateStore)

        kb.add(newTracker, UI.ns.space('inspiration'), thisTracker, there)

        // $rdf.log.debug("\n Ready to put " + kb.statementsMatching(undefined, undefined, undefined, there)); //@@

        updater.put(
          there,
          kb.statementsMatching(undefined, undefined, undefined, there),
          'text/turtle',
          function (uri2, ok, message) {
            if (ok) {
              updater.put(newStore, [], 'text/turtle', function (
                uri3,
                ok,
                message
              ) {
                if (ok) {
                  console.info(
                    'Ok The tracker created OK at: ' +
                      newTracker.uri +
                      '\nMake a note of it, bookmark it. '
                  )
                } else {
                  console.log(
                    'FAILED to set up new store at: ' +
                      newStore.uri +
                      ' : ' +
                      message
                  )
                }
              })
            } else {
              console.log(
                'FAILED to save new tracker at: ' + there.uri + ' : ' + message
              )
            }
          }
        )

        // Created new data files.
        // @@ Now create initial files - html skin, (Copy of mashlib, css?)
        // @@ Now create form to edit configuation parameters
        // @@ Optionally link new instance to list of instances -- both ways? and to child/parent?
        // @@ Set up access control for new config and store.
      }) // callback to newAppInstance

      button.setAttribute('style', 'margin: 0.5em 1em;')
      return button
    } // newTrackerButton

    // /////////////////////////////////////////////////////////////////////////////

    // Refresh the DOM tree - now in UI.widgets

    function refreshTree (root) {
      if (root.refresh) {
        root.refresh()
        return
      }
      for (var i = 0; i < root.children.length; i++) {
        refreshTree(root.children[i])
      }
    }

    function renderBoard (tracker) {
      const states = kb.any(subject, WF('issueClass'))
      var query = new $rdf.Query(UI.utils.label(subject))
      var cats = [kb.any(tracker, WF('issueCategory'))] // pick one @@
      var vars = ['issue', 'state', 'created']
      for (let i = 0; i < cats.length; i++) {
        vars.push('_cat_' + i)
      }
      var v = {} // The RDF variable objects for each variable name
      vars.map(function (x) {
        query.vars.push((v[x] = $rdf.variable(x)))
      })
      query.pat.add(v.issue, WF('tracker'), tracker)
      query.pat.add(v.issue, ns.dct('created'), v.created)
      query.pat.add(v.issue, ns.rdf('type'), v.state)
      query.pat.add(v.state, ns.rdfs('subClassOf'), states)
      for (let i = 0; i < cats.length; i++) {
        query.pat.add(v.issue, ns.rdf('type'), v['_cat_' + i])
        query.pat.add(v['_cat_' + i], ns.rdfs('subClassOf'), cats[i])
      }

      query.pat.optional = []

      var propertyList = kb.any(tracker, WF('propertyList')) // List of extra properties
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
          kb.holds(s, ns.rdfs('subClassOf'), WF('Open')) ||
          s.sameTerm(WF('Open'))
        ) {
          selectedStates[s.uri] = true
          columnValues.push(s)
          // console.log('on '+s.uri); // @@
        }
      })

      function whenDone () {
        alert('board finsihed')
      }
      const options = { }
      // const columnValues = states // @@ optionally selected states would work
      const boardDiv = board(dom, query, columnValues, UI.widgets.personTR, selectedStates, v.state, v.issue, options, whenDone)
      return boardDiv
    }

    function renderTable (tracker) {
      const states = kb.any(subject, WF('issueClass'))
      var query = new $rdf.Query(UI.utils.label(subject))
      var cats = kb.each(tracker, WF('issueCategory')) // zero or more
      var vars = ['issue', 'state', 'created']
      for (let i = 0; i < cats.length; i++) {
        vars.push('_cat_' + i)
      }
      var v = {} // The RDF variable objects for each variable name
      vars.map(function (x) {
        query.vars.push((v[x] = $rdf.variable(x)))
      })
      query.pat.add(v.issue, WF('tracker'), tracker)
      // query.pat.add(v['issue'], ns.dc('title'), v['title'])
      query.pat.add(v.issue, ns.dct('created'), v.created)
      query.pat.add(v.issue, ns.rdf('type'), v.state)
      query.pat.add(v.state, ns.rdfs('subClassOf'), states)
      for (let i = 0; i < cats.length; i++) {
        query.pat.add(v.issue, ns.rdf('type'), v['_cat_' + i])
        query.pat.add(v['_cat_' + i], ns.rdfs('subClassOf'), cats[i])
      }

      query.pat.optional = []

      var propertyList = kb.any(tracker, WF('propertyList')) // List of extra properties
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
          kb.holds(s, ns.rdfs('subClassOf'), WF('Open')) ||
          s.sameTerm(WF('Open'))
        ) {
          selectedStates[s.uri] = true
          // console.log('on '+s.uri); // @@
        }
      })

      function exposeThisOverlay (href) {
        const subject = $rdf.sym(href)
        exposeOverlay(subject)
      }

      var tableDiv = UI.table(dom, {
        query: query,
        keyVariable: '?issue', // Charactersic of row
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
    function renderTabsTableAndBoard () {
      function renderMain (ele, object) {
        if (object === 'board') {
          ele.appendChild(renderBoard(tracker))
        } else if (object === 'table') {
          ele.appendChild(renderTable(tracker))
        } else {
          throw new Error('Execpected tab type: ' + object)
        }
      }
      const options = {
        renderMain: renderMain,
        items: ['table', 'board']
      }
      const tabs = UI.tabs.tabWidget(options)
      return tabs
    }

    function renderTracker () {
      function showNewIssue (issue) {
        UI.widgets.refreshTree(paneDiv)
        exposeOverlay(issue)
        b.setAttribute('disabled', false)
      }
      tracker = subject

      var states = kb.any(subject, WF('issueClass'))
      if (!states) throw new Error('This tracker has no issueClass')
      var stateStore = kb.any(subject, WF('stateStore'))
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
          container.appendChild(newIssueForm(dom, kb, tracker, null, b, showNewIssue))
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
                refreshTree(tableDiv)
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
      tracker = kb.any(subject, WF('tracker'))
      if (!tracker) throw new Error('This issue ' + subject + 'has no tracker')

      // Much data is in the tracker instance, so wait for the data from it

      context.session.store.fetcher
        .load(tracker.doc())
        .then(function (_xhrs) {
          var stateStore = kb.any(tracker, WF('stateStore'))
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
    overlay.setAttribute(
      'style',
      ' position: fixed; top: 1.51em; right: 2em; left: 2em; border: 0.1em grey;'
    )
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
