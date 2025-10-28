import { solidLogicSingleton, store } from 'solid-logic'

export const context = {
  session: {
    store,
    paneRegistry: {
      byName: (name) => {
        // longChatPane
      }
    },
    logic: solidLogicSingleton
  },
  dom: document,
  getOutliner: () => null,
}

export const fetcher = store.fetcher
