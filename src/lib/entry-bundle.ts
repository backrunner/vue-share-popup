import { useSharePopup } from './main';

export * from './main';

declare global {
  interface Window {
    useSharePopup: typeof useSharePopup;
  }
}

window.useSharePopup = useSharePopup;
