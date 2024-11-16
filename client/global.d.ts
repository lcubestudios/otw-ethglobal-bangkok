declare global {
  interface Window {
    webpackChunkclient?: any; // Marking it optional to avoid undefined issues
  }
}

export {};