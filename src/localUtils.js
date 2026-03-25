function openModal ({ title, message, buttons }) {
  const overlay = ensureModalOverlay()
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

export function alertDialog (message, title = 'Information') {
  return openModal({
    title,
    message,
    buttons: [{ label: 'OK', value: true, primary: true }]
  })
}

export function complain (div, d, message) {
  div.appendChild(UI.widgets.errorMessageBlock(d, message, 'pink'))
}
