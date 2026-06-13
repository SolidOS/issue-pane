import { sym } from 'rdflib'
import pane from '../src/issuePane'
import './dev-global.css' // Import after src to override component styles
import { context, fetcher } from './context'
import { authn, authSession } from 'solid-logic'
import * as UI from 'solid-ui'

const loginBanner = document.getElementById('loginBanner')
const webId = document.getElementById('webId')

if (loginBanner) {
  loginBanner.appendChild(UI.login.loginStatusBox(document, null, {}))
}

async function finishLogin () {
  const me = await authn.checkUser()
  const session = authSession
  const sessionWebId = session?.webId ?? session?.info?.webId ?? null
  const meWebId = me?.uri ?? me?.value ?? null
  const webIdUri = meWebId ?? sessionWebId
  const isLoggedIn = Boolean(
    me ||
    session?.isActive ||
    session?.info?.isLoggedIn ||
    sessionWebId
  )

  if (isLoggedIn && webIdUri) {
    // Update the page with the status.
    if (webId) {
      webId.innerHTML = 'Logged in as: ' + webIdUri
    }
  } else {
    if (webId) {
      webId.innerHTML = ''
    }
  }
}

finishLogin()

// https://testingsolidos.solidcommunity.net/profile/card#me
// https://timbl.solidcommunity.net/profile/card#me
//
// const targetURIToShow = "https://angelo.veltens.org/profile/card#me";
// const targetURIToShow = "https://testingsolidos.solidcommunity.net/profile/card#me";
// const targetURIToShow = "https://timbl.solidcommunity.net/profile/card#me";

// const targetURIToShow = "https://solidproject.solidcommunity.net/Roadmap/index.ttl#this";

// const targetURIToShow = "https://timbl.com/timbl/Automation/mother/tracker.n3#mother"
// const targetURIToShow = 'https://sstratsianis.solidcommunity.net/TestingTracker/index.ttl#this'
const targetURIToShow = new URL('./big-tracker.ttl#this', window.location.href).href

fetcher.load(targetURIToShow).then(() => {
  const app = pane.render(sym(targetURIToShow), context)
  document.getElementById('app').replaceWith(app)
})
