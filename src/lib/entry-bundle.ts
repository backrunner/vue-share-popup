import { useSharePopup } from './main';
import * as platforms from './platforms/index';

export * from './main';

declare global {
  interface Window {
    useSharePopup: typeof useSharePopup;
    sharePopupComps: typeof platforms;
  }
}

window.useSharePopup = useSharePopup;
window.sharePopupComps = platforms;
