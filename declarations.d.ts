export interface PaneDefinition {
  icon: string
  name: string
  audience: unknown[]
  label: (subject: unknown, context: unknown) => string | null
  render: (subject: unknown, context: { dom: Document }) => HTMLElement
  mintClass?: unknown
  mintNew?: (context: unknown, options: unknown) => Promise<unknown>
}

declare const issuePane: PaneDefinition
export default issuePane
