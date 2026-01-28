import type {
  DocComponentOptions,
  DocComponentInstance,
  FeatureConfig,
  DocComponentEvent,
  InvokeEventType,
  InvokeEventArgs,
  InvokeEventReturn,
  ListenerEventType,
  ListenerEventCallbackPayload,
  SDKResponse,
} from './types';
import { loadSDK, isSDKLoaded } from './loader';

/**
 * 飞书文档组件核心类
 */
export class LarkDocsComponent {
  private instance: DocComponentInstance | null = null;
  private readonly options: DocComponentOptions;
  private started = false;

  constructor(options: DocComponentOptions) {
    this.options = options;
  }

  /**
   * 初始化并启动组件
   */
  async start(): Promise<void> {
    if (this.started) {
      console.warn('Component already started');
      return;
    }

    // 加载 SDK
    await loadSDK();

    if (!isSDKLoaded()) {
      throw new Error('Failed to load Lark Docs SDK');
    }

    // 创建组件实例
    this.instance = new window.DocComponentSdk(this.options);

    // 启动组件
    await this.instance.start();
    this.started = true;
  }

  /**
   * 销毁组件
   */
  destroy(): void {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
      this.started = false;
    }
  }

  /**
   * 调用组件能力
   */
  async invoke<E extends InvokeEventType>(
    event: E,
    ...args: InvokeEventArgs<E>
  ): Promise<SDKResponse<InvokeEventReturn<E>>> {
    this.ensureStarted();
    return this.instance!.invoke(event, ...args);
  }

  /**
   * 注册事件监听
   */
  register<E extends ListenerEventType>(
    event: E,
    callback: (payload: ListenerEventCallbackPayload<E>) => void
  ): void {
    this.ensureStarted();
    this.instance!.register(event, callback);
  }

  /**
   * 取消事件监听
   */
  unregister(event: DocComponentEvent | string, callback: (...args: any[]) => void): void {
    this.ensureStarted();
    this.instance!.unregister(event, callback);
  }

  /**
   * 设置功能配置
   */
  setFeatureConfig(config: FeatureConfig): void {
    this.ensureStarted();
    this.instance!.setFeatureConfig(config);
  }

  /**
   * 切换文档
   */
  replace(src: string): void {
    this.ensureStarted();
    this.instance!.replace(src);
  }

  /**
   * 刷新文档
   */
  refresh(): void {
    this.ensureStarted();
    this.instance!.refresh();
  }

  /**
   * 确保组件已启动
   */
  private ensureStarted(): void {
    if (!this.started || !this.instance) {
      throw new Error('Component not started. Please call start() first.');
    }
  }

  /**
   * 获取原始实例（高级用法）
   */
  getInstance(): DocComponentInstance | null {
    return this.instance;
  }
}
