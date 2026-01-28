# lark-docs-sdk

Core library for Lark Docs Component, providing basic SDK wrapper and type definitions.

飞书文档组件核心库，提供基础的 SDK 封装和类型定义。

## Installation / 安装

```bash
npm install lark-docs-sdk
# or
pnpm add lark-docs-sdk
# or
yarn add lark-docs-sdk
```

## Usage / 使用

```typescript
import { LarkDocsComponent, DocComponentEvent } from 'lark-docs-sdk';

// Create component instance / 创建组件实例
const component = new LarkDocsComponent(
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

// Start component / 启动组件
await component.start();

// Register event listener / 监听事件
component.register(DocComponentEvent.SUITE_TITLE_CHANGE, (title) => {
  console.log('Title changed:', title);
});

// Invoke method / 调用方法
const response = await component.invoke(DocComponentEvent.GET_SUITE_TITLE);
console.log('Current title:', response.data);

// Destroy component / 销毁组件
component.destroy();
```

## API

### LarkDocsComponent

#### Methods / 方法

- `start()`: Initialize and start the component / 初始化并启动组件
- `destroy()`: Destroy the component / 销毁组件
- `invoke(event, ...args)`: Invoke component capabilities / 调用组件能力
- `register(event, callback)`: Register event listener / 注册事件监听
- `unregister(event, callback)`: Unregister event listener / 取消事件监听
- `setFeatureConfig(config)`: Set feature configuration / 设置功能配置
- `replace(src)`: Switch document / 切换文档
- `refresh()`: Refresh document / 刷新文档

## License

MIT
