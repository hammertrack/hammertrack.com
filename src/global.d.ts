/// <reference types="svelte" />
/// <reference types="vite/client" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onflash?: ({ element: string }) => void
  }
}

interface ImportMetaEnv {
  readonly VITE_SERVER_BASE_URL: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_CHANNEL_ENDPOINT: string
  readonly VITE_USER_ENDPOINT: string
}
