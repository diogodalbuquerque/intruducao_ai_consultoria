/// <reference types="vite/client" />

declare module "*.png" {
  const value: string
  export default value
}

declare module "*.jpg" {
  const value: string
  export default value
}

declare module "*.svg" {
  const value: string
  export default value
}

type ElementSdkInitOptions = {
  defaultConfig: Record<string, unknown>
  onConfigChange: (config: Record<string, string>) => void
  mapToCapabilities: (config: Record<string, string>) => Record<string, unknown>
  mapToEditPanelValues: (
    config: Record<string, string>,
  ) => Map<string, string>
}

declare global {
  interface Window {
    elementSdk?: {
      init: (options: ElementSdkInitOptions) => void
    }
  }
}

export {}

