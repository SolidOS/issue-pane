import { widgets } from "solid-ui"

function openModal ({ title, message, buttons, dom }) {
  const overlay = ensureModalOverlay()
  const modalDom = dom || overlay.ownerDocument
  previousFocus = document.activeElement
  hideSiblings(true)
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
      const b = modalDom.createElement('button')
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
    modalOverlay.classList.add('hidden')
    hideSiblings(false)
    if (previousFocus && previousFocus.focus) previousFocus.focus()
  }
}

export function alertDialog (message, title = 'Information', dom = null) {
  return openModal({
    title,
    message,
    buttons: [{ label: 'OK', value: true, primary: true }],
    dom
  })
}

export function complain (div, d, message) {
  div.appendChild(widgets.errorMessageBlock(d, message, 'pink'))
}
