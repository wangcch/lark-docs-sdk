# lark-docs-sdk

Core library for Lark Docs Component, providing basic SDK wrapper and type definitions.

飞书文档组件核心库，提供基础的 SDK 封装和类型定义。

## Features / 特性

- 🚀 **Auto SDK Loading** - Automatically loads Lark Docs SDK / 自动加载飞书文档 SDK
- 🔐 **Signature Utilities** - Built-in signature generation tools / 内置签名生成工具
- 📝 **Full TypeScript Support** - Complete type definitions / 完整的类型定义
- 🎯 **Event System** - Rich invoke and listener events / 丰富的调用和监听事件
- ⚙️ **Feature Configuration** - Flexible UI customization / 灵活的 UI 配置

## Installation / 安装

```bash
npm install lark-docs-sdk
```

## Quick Start / 快速开始

```typescript
import { LarkDocsComponent } from 'lark-docs-sdk';

const component = new LarkDocsComponent({
  src: 'https://bytedance.feishu.cn/docx/RVx9dHXxMonmtVxTA3UcjHunnCu',
  mount: document.querySelector('#doc-container')!,
  auth: {
    openId: 'your-open-id',
    signature: 'your-signature',
    appId: 'your-app-id',
    timestamp: Date.now(),
    nonceStr: 'random-string',
    url: window.location.href,
    jsApiList: ['DocsComponent'],
  },
  onMountSuccess: () => {
    console.log('Document mounted successfully');
  },
});

await component.start();
```

## Signature Generation / 签名生成

The SDK provides utilities for generating authentication signatures:

```typescript
import {
  createSignature,
  generateNonceStr,
  buildSignatureString,
  generateSignature,
  normalizeUrl,
} from 'lark-docs-sdk';

// Method 1: Quick signature creation (recommended)
// 方法一：快速创建签名（推荐）
const auth = await createSignature({
  jsapi_ticket: 'your-jsapi-ticket',
  url: window.location.href,
});
// Returns: { signature: '...', noncestr: '...', timestamp: 1609904126124 }

// Method 2: Manual signature creation
// 方法二：手动创建签名
const noncestr = generateNonceStr(); // 'Y7a8KkqX041bsSwT'
const timestamp = Date.now();
const url = normalizeUrl(window.location.href); // Removes hash fragment

const str = buildSignatureString({
  jsapi_ticket: 'your-ticket',
  noncestr,
  timestamp,
  url,
});

const signature = await generateSignature(str);
```

## API Reference

### LarkDocsComponent

#### Constructor Options / 构造函数选项

```typescript
interface DocComponentOptions {
  /** Document URL / 文档 URL */
  src: string;
  /** Mount element / 挂载节点 */
  mount: HTMLElement;
  /** Feature configuration / 功能配置 */
  config?: FeatureConfig;
  /** Theme: 'light' | 'dark' / 主题 */
  theme?: Theme;
  /** Size configuration / 尺寸配置 */
  size?: SizeConfig;
  /** Authentication config / 鉴权配置 */
  auth?: AuthConfig;
  /** Error callback / 错误回调 */
  onError?: (error: { code: string; msg: string }) => void;
  /** Auth error callback / 鉴权失败回调 */
  onAuthError?: (error: any) => void;
  /** Mount success callback / 挂载成功回调 */
  onMountSuccess?: () => void;
  /** Mount timeout callback / 挂载超时回调 */
  onMountTimeout?: () => void;
}
```

#### Methods / 方法

| Method                        | Description                                           |
| ----------------------------- | ----------------------------------------------------- |
| `start()`                     | Initialize and start the component / 初始化并启动组件 |
| `destroy()`                   | Destroy the component / 销毁组件                      |
| `invoke(event, ...args)`      | Invoke component capabilities / 调用组件能力          |
| `register(event, callback)`   | Register event listener / 注册事件监听                |
| `unregister(event, callback)` | Unregister event listener / 取消事件监听              |
| `setFeatureConfig(config)`    | Set feature configuration / 设置功能配置              |
| `replace(src)`                | Switch document / 切换文档                            |
| `refresh()`                   | Refresh document / 刷新文档                           |
| `getInstance()`               | Get raw SDK instance (advanced) / 获取原始实例        |

### Events / 事件

#### Invoke Events / 调用事件

Use with `component.invoke(event, ...args)`:

| Event                          | Description                              | Return Type              |
| ------------------------------ | ---------------------------------------- | ------------------------ |
| `GET_SUITE_TITLE`              | Get document title / 获取文档标题        | `string`                 |
| `GET_CURRENT_AUTH`             | Get current permissions / 获取当前权限   | `AuthData`               |
| `GET_DIRECTORY_DATA`           | Get table of contents / 获取目录数据     | `DirectoryItem[]`        |
| `GET_SUPPORTED_EXPORT_FORMATS` | Get export formats / 获取支持的导出格式  | `string[]`               |
| `GET_TRANSLATE_LANG`           | Get translation languages / 获取翻译语言 | `string[]`               |
| `SCROLL_TO`                    | Scroll to position / 滚动到指定位置      | `void`                   |
| `ANCHOR_JUMP`                  | Jump to anchor / 跳转到锚点              | `void`                   |
| `TOGGLE_PRINT_BOX`             | Toggle print dialog / 切换打印对话框     | `void`                   |
| `TOGGLE_SHARE_MENU`            | Toggle share menu / 切换分享菜单         | `void`                   |
| `TOGGLE_HISTORY`               | Toggle history panel / 切换历史面板      | `void`                   |
| `TOGGLE_COMMENT_HISTORY`       | Toggle comment history / 切换评论历史    | `void`                   |
| `EXPORT_BY_TYPE`               | Export document / 导出文档               | `void`                   |
| `ADD_NEW_COMMENT`              | Add a new comment / 添加评论             | `{ commentId, replyId }` |
| `JUMP_TO_COMMENT`              | Jump to comment / 跳转到评论             | `void`                   |

#### Listener Events / 监听事件

Use with `component.register(event, callback)`:

| Event                    | Description                         | Callback Payload          |
| ------------------------ | ----------------------------------- | ------------------------- |
| `SUITE_TITLE_CHANGE`     | Title changed / 标题变更            | `string`                  |
| `AUTH_CHANGE`            | Permissions changed / 权限变更      | `AuthData`                |
| `DIRECTORY_CHANGE`       | TOC changed / 目录变更              | `DirectoryItem[]`         |
| `DOCUMENT_HEIGHT`        | Height changed / 高度变更           | `number`                  |
| `DOC_EDITOR_SCROLL`      | Scroll position / 滚动位置          | `number`                  |
| `SELECTION_CHANGE`       | Selection changed / 选区变更        | `SelectionData[]`         |
| `IMAGE_VIEW`             | Image clicked / 图片点击            | `{ key, url, blob }`      |
| `HYPERLINK_CLICK`        | Link clicked / 链接点击             | `string`                  |
| `FULL_SCREEN_MODE`       | Fullscreen toggle / 全屏切换        | `boolean`                 |
| `TRANSLATE_CHANGE`       | Translation changed / 翻译变更      | `string`                  |
| `ON_CREATE_TEMP_COMMENT` | Temp comment created / 临时评论创建 | `{ quote, tmpCommentId }` |
| `ON_ACTIVE_COMMENT`      | Comment activated / 评论激活        | `{ commentId }`           |

### Signature Utilities / 签名工具

| Function                                 | Description                                               |
| ---------------------------------------- | --------------------------------------------------------- |
| `createSignature({ jsapi_ticket, url })` | Create complete signature info (async) / 创建完整签名信息 |
| `generateNonceStr(length?)`              | Generate secure random string / 生成安全随机字符串        |
| `generateSignature(text)`                | Generate SHA-1 signature (async) / 生成 SHA-1 签名        |
| `buildSignatureString(params)`           | Build signature source string / 构建签名源字符串          |
| `normalizeUrl(url)`                      | Normalize URL (remove hash) / 规范化 URL                  |

## Browser Support / 浏览器支持

- Chrome >= 60
- Firefox >= 55
- Safari >= 12
- Edge >= 79

> **Note**: The signature utilities require Web Crypto API support.

## License

MIT
