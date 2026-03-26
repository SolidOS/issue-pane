const LEVELS = {
  trace: 10,
  log: 20,
  warn: 30,
  error: 40,
  silent: 99
}

let currentLevel = LEVELS.silent

function defaultWriter (level, ...args) {
  const c = globalThis && globalThis['console']
  if (!c) return
  if (level === 'warn' && typeof c.warn === 'function') return c.warn(...args)
  if (level === 'error' && typeof c.error === 'function') return c.error(...args)
  if (typeof c.log === 'function') return c.log(...args)
}

let sink = defaultWriter

currentLevel = LEVELS.warn

export function configureDebug ({ level = 'warn', writer } = {}) {
  currentLevel = LEVELS[level] ?? LEVELS.warn
  sink = writer === undefined ? defaultWriter : writer
}

function emit (level, args) {
  if (!sink) return
  if ((LEVELS[level] ?? LEVELS.silent) < currentLevel) return
  sink(level, ...args)
}

export function log (...args) {
  emit('log', args)
}

export function warn (...args) {
  emit('warn', args)
}

export function error (...args) {
  emit('error', args)
}

export function trace (...args) {
  emit('trace', args)
}
