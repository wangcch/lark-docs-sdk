/**
 * SDK 加载器
 */

const SDK_URL =
  'https://sf1-scmcdn-cn.feishucdn.com/obj/feishu-static/docComponentSdk/lib/1.0.13.js';
let sdkLoaded = false;
let sdkLoading: Promise<void> | null = null;

/**
 * 加载飞书文档组件 SDK
 */
export function loadSDK(): Promise<void> {
  if (sdkLoaded) {
    return Promise.resolve();
  }

  if (sdkLoading) {
    return sdkLoading;
  }

  sdkLoading = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('SDK can only be loaded in browser environment'));
      return;
    }

    // 检查是否已经加载
    if (window.DocComponentSdk) {
      sdkLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = SDK_URL;
    script.async = true;

    script.onload = () => {
      if (window.DocComponentSdk) {
        sdkLoaded = true;
        resolve();
      } else {
        reject(new Error('Failed to load Lark Docs SDK'));
      }
    };

    script.onerror = () => {
      reject(new Error('Failed to load Lark Docs SDK'));
    };

    document.head.appendChild(script);
  });

  return sdkLoading;
}

/**
 * 检查 SDK 是否已加载
 */
export function isSDKLoaded(): boolean {
  return sdkLoaded && typeof window !== 'undefined' && !!window.DocComponentSdk;
}
