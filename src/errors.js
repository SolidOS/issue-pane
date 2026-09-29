import { widgets } from 'solid-ui'
import './errors.css'

export function complain (div, d, message) {
  div.appendChild(widgets.errorMessageBlock(d, message, 'pink'))
}

export function renderErrorSection (dom, container) {
  const errorSection = dom.createElement('section')
  errorSection.classList.add('errorSection')
  errorSection.setAttribute('role', 'status')
  errorSection.setAttribute('aria-live', 'polite')
  errorSection.setAttribute('aria-atomic', 'true') // useful for status messages WCAG 4.1.3
  errorSection.setAttribute('aria-label', 'Error messages')
  errorSection.hidden = true
  container.appendChild(errorSection)

  function clearErrors () {
    errorSection.innerHTML = ''
    errorSection.hidden = true
  }

  function showError (message) {
    errorSection.innerHTML = ''
    errorSection.hidden = false
    complain(errorSection, dom, message)
  }

  return {
    errorSection,
    clearErrors,
    showError
  }
}
