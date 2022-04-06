import App from './App.svelte'

const rootEl = document.getElementById('app')

if (!rootEl) {
  throw new TypeError('invalid root element type')
}

const app = new App({
  target: rootEl,
})

export default app
