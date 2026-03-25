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
