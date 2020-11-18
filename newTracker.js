import * as UI from 'solid-ui'

const $rdf = UI.rdf
const ns = UI.ns
const kb = UI.store
const updater = kb.updater

/* Button for making a whole new tracker
** This is the least tesetd part of the tracker system at the moment.
*/
export function newTrackerButton (thisTracker, context) {
  function timestring () {
    const now = new Date()
    return '' + now.getTime()
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
  }

  // const dom = context.dom
  const button = UI.authn.newAppInstance(context.dom, { noun: 'tracker' }, function (
    ws,
    base
  ) {
    const appPathSegment = 'issuetracker.w3.org' // how to allocate this string and connect to
    // console.log("Ready to make new instance at "+ws)
    const sp = UI.ns.space
    const kb = context.session.store

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

    const stateStore = kb.any(thisTracker, ns.wf('stateStore'))
    const newStore = kb.sym(base + 'store.ttl')

    const here = thisTracker.doc()

    const oldBase = here.uri.slice(0, here.uri.lastIndexOf('/') + 1)

    var morph = function (x) {
      // Move any URIs in this space into that space
      if (x.elements !== undefined) return x.elements.map(morph) // Morph within lists
      if (x.uri === undefined) return x
      let u = x.uri
      if (u === stateStore.uri) return newStore // special case
      if (u.slice(0, oldBase.length) === oldBase) {
        u = base + u.slice(oldBase.length)
        $rdf.log.debug(' Map ' + x.uri + ' to ' + u)
      }
      return kb.sym(u)
    }
    const there = morph(here)
    const newTracker = morph(thisTracker)

    const myConfig = kb.statementsMatching(
      undefined,
      undefined,
      undefined,
      here
    )
    for (let i = 0; i < myConfig.length; i++) {
      const st = myConfig[i]
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
