/**
 * 飞书组件 Signature 生成工具
 * 用于生成鉴权所需的签名
 */

/**
 * 生成 signature 拼接字符串（string1）
 * @param params 签名参数
 * @returns 拼接后的字符串
 * @example
 * ```ts
 * const str = buildSignatureString({
 *   jsapi_ticket: 'a885c93b03d6b6057e992ddda519e6ac857b5d6c',
 *   noncestr: 'Y7a8KkqX041bsSwT',
 *   timestamp: 1609904126124,
 *   url: 'https://example.com/page'
 * });
 * // 'jsapi_ticket=...&noncestr=...&timestamp=...&url=...'
 * ```
 */
export function buildSignatureString(params: {
  /** jsapi_ticket，通过 access_token 获取 */
  jsapi_ticket: string;
  /** 随机字符串，由数字、字母组成 */
  noncestr: string;
  /** 时间戳（毫秒） */
  timestamp: string | number;
  /** 调用页面的完整 URL（不包含 # 和 ? 后的参数） */
  url: string;
}): string {
  return `jsapi_ticket=${params.jsapi_ticket}&noncestr=${params.noncestr}&timestamp=${params.timestamp}&url=${params.url}`;
}

/**
 * 生成 SHA-1 签名（浏览器环境）
 * @param text 待签名的字符串
 * @returns SHA-1 签名的十六进制字符串
 * @example
 * ```ts
 * const signature = await generateSignature('jsapi_ticket=...');
 * // 'fc87e50e5fa427ffad0685cc5040a004531d8e9c'
 * ```
 */
export async function generateSignature(text: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto?.subtle) {
    throw new Error('当前环境不支持 Web Crypto API，请在现代浏览器中使用');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);

  // 转换为十六进制字符串
  return Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * 生成随机字符串（noncestr）
 * 使用 crypto.getRandomValues() 生成密码学安全的随机数
 * @param length 字符串长度，默认 16
 * @returns 随机字符串
 * @example
 * ```ts
 * const noncestr = generateNonceStr();
 * // 'Y7a8KkqX041bsSwT'
 * ```
 */
export function generateNonceStr(length = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, n => chars[n % chars.length]).join('');
}

/**
 * 规范化 URL（保留查询参数，移除 hash 片段）
 * @param url 需要规范化的 URL
 * @returns 规范化后的 URL
 * @example
 * ```ts
 * normalizeUrl('https://example.com/page?foo=bar#hash');
 * // 'https://example.com/page?foo=bar'
 * ```
 */
export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return `${urlObj.origin}${urlObj.pathname}${urlObj.search}`;
  } catch {
    return url.split('#')[0];
  }
}

/**
 * 创建完整的签名信息（便捷方法）
 * 自动生成 noncestr 和 timestamp，返回所有鉴权所需参数
 * @param params 签名参数
 * @returns 包含 signature、noncestr、timestamp 的对象
 * @example
 * ```ts
 * const auth = await createSignature({
 *   jsapi_ticket: 'your-ticket',
 *   url: 'https://example.com/page'
 * });
 * // { signature: '...', noncestr: '...', timestamp: 1609904126124 }
 * ```
 */
export async function createSignature(params: {
  jsapi_ticket: string;
  url: string;
}): Promise<{ signature: string; noncestr: string; timestamp: number }> {
  const noncestr = generateNonceStr();
  const timestamp = Date.now();
  const normalizedUrl = normalizeUrl(params.url);
  const str = buildSignatureString({
    jsapi_ticket: params.jsapi_ticket,
    noncestr,
    timestamp,
    url: normalizedUrl,
  });
  const signature = await generateSignature(str);
  return { signature, noncestr, timestamp };
}
