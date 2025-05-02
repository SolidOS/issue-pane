import { DataBrowserContext, PaneRegistry } from "pane-registry";
import { LiveStore, solidLogicSingleton, store } from "solid-logic";

export const context = {
  session: {
    store: store,
    paneRegistry: {
      byName: (name) => {
        return // longChatPane
      }
    },
    logic : solidLogicSingleton
  },
  dom: document,
  getOutliner: () => null,
};

export const fetcher = store.fetcher;
