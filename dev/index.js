import { sym } from "rdflib";
import { default as pane } from "..";
import { context, fetcher } from "./context";
import { authn, authSession } from "solid-logic";
import * as UI from "solid-ui";

const loginBanner = document.getElementById("loginBanner");
const webId = document.getElementById("webId");

loginBanner.appendChild(UI.login.loginStatusBox(document, null, {}));

async function finishLogin() {
  await authSession.handleIncomingRedirect();
  const session = authSession;
  if (session.info.isLoggedIn) {
    // Update the page with the status.
    webId.innerHTML = "Logged in as: " + authn.currentUser().uri;
  } else {
    webId.innerHTML = "";
  }
}

finishLogin();


// https://testingsolidos.solidcommunity.net/profile/card#me
// https://timbl.solidcommunity.net/profile/card#me
//
// const targetURIToShow = "https://angelo.veltens.org/profile/card#me";
// const targetURIToShow = "https://testingsolidos.solidcommunity.net/profile/card#me";
const targetURIToShow = "https://timbl.solidcommunity.net/profile/card#me";

fetcher.load(targetURIToShow).then(() => {
  const app = pane.render(sym(targetURIToShow), context);
  document.getElementById("app").replaceWith(app);
});
