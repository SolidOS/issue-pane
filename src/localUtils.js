import { widgets } from 'solid-ui'
import './localUtils.css'

/* Copied from contacts-pane, made minor adjustments */
let modalOverlay = null
let previousFocus = null

function ensureModalOverlay (dom) {
  // if we previously created an overlay but it was removed from the document
  // (tests clear body), rebuild it.  Checking presence ensures our reference
  // doesn't point at a detached element.
  if (modalOverlay && dom.body.contains(modalOverlay)) return modalOverlay
  // otherwise drop stale reference and create a new element
  modalOverlay = null
  // overlay container
  modalOverlay = dom.createElement('div')
  modalOverlay.id = 'issue-modal'
  modalOverlay.className = 'focus-trap hidden'
  modalOverlay.setAttribute('role', 'presentation')

  modalOverlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-desc">
      <h2 id="modal-title"></h2>
      <div id="modal-desc"></div>
      <div id="modal-buttons"></div>
    </div>
  `

  dom.body.appendChild(modalOverlay)

  // keyboard handling (esc/tab)
  modalOverlay.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      // simulate cancel if available
      const cancelBtn = modalOverlay.querySelector('button[data-cancel]')
      if (cancelBtn) cancelBtn.click()
      else closeModal(false)
    } else if (e.key === 'Tab') {
      // simple focus trap: cycle through focusable elements inside overlay
      const focusable = Array.from(modalOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'))
      if (focusable.length === 0) return
      const idx = focusable.indexOf(dom.activeElement)
      if (e.shiftKey) {
        if (idx === 0) {
          focusable[focusable.length - 1].focus()
          e.preventDefault()
        }
      } else {
        if (idx === focusable.length - 1) {
          focusable[0].focus()
          e.preventDefault()
        }
      }
    }
  })

  return modalOverlay
}

function hideSiblings (hide, dom) {
  const siblings = Array.from(dom.body.children).filter(c => c !== modalOverlay)
  siblings.forEach(el => {
    if (hide) el.setAttribute('aria-hidden', 'true')
    else el.removeAttribute('aria-hidden')
  })
}

function openModal ({ title, message, buttons, dom }) {
  const overlay = ensureModalOverlay(dom)

  previousFocus = dom.activeElement
  hideSiblings(true, dom)
  overlay.classList.remove('hidden')

  overlay.querySelector('#modal-title').textContent = title || ''
  const descEl = overlay.querySelector('#modal-desc')
  if (typeof message === 'string') {
    descEl.textContent = message
  } else {
    // allow passing nodes
    descEl.innerHTML = ''
    descEl.appendChild(message)
  }

  const btnContainer = overlay.querySelector('#modal-buttons')
  btnContainer.innerHTML = ''

  return new Promise(resolve => {
    buttons.forEach(btn => {
      const b = dom.createElement('button')
      b.setAttribute('type', 'button')
      b.textContent = btn.label
      if (btn.primary) b.classList.add('btn-primary')
      if (btn.cancel) b.setAttribute('data-cancel', 'true')
      b.addEventListener('click', () => {
        closeModal(btn.value)
        resolve(btn.value)
      })
      btnContainer.appendChild(b)
    })
    // focus first button
    const first = btnContainer.querySelector('button')
    if (first) first.focus()
  })
}

function closeModal (result) {
  if (modalOverlay) {
    const modalDom = modalOverlay.ownerDocument
    modalOverlay.classList.add('hidden')
    hideSiblings(false, modalDom)
    if (previousFocus && previousFocus.focus) previousFocus.focus()
  }
}

export function alertDialog (message, title = 'Information', dom) {
  return openModal({
    title,
    message,
    buttons: [{ label: 'OK', value: true, primary: true }],
    dom
  })
}
