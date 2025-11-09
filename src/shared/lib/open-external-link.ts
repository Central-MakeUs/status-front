import { MESSAGE_TYPES } from '../config/web-view';

export const openExternalLink = (url: string): void => {
  const isWebView = window.ReactNativeWebView !== undefined;

  if (isWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: MESSAGE_TYPES.OPEN_EXTERNAL_BROWSER,
        url,
      })
    );
  } else {
    window.open(url, '_blank');
  }
};
