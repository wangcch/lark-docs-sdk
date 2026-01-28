/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Lark Docs Component SDK 类型定义
 */

/** 文档组件事件枚举 */
export enum DocComponentEvent {
  // 调用能力
  HAS_UNFINISHED_TASK = 'HAS_UNFINISHED_TASK',
  SCROLL_TO = 'SCROLL_TO',
  TOGGLE_REPLACE_BOX = 'TOGGLE_REPLACE_BOX',
  TOGGLE_MODAL = 'TOGGLE_MODAL',
  TOGGLE_PRINT_BOX = 'TOGGLE_PRINT_BOX',
  TOGGLE_SHARE_MENU = 'TOGGLE_SHARE_MENU',
  TOGGLE_COMMENT_HISTORY = 'TOGGLE_COMMENT_HISTORY',
  TOGGLE_HISTORY = 'TOGGLE_HISTORY',
  REPORT_ABUSE = 'REPORT_ABUSE',
  EXPORT_BY_TYPE = 'EXPORT_BY_TYPE',
  TOGGLE_TRANSLATE = 'TOGGLE_TRANSLATE',
  ANCHOR_JUMP = 'ANCHOR_JUMP',
  GET_SUITE_TITLE = 'GET_SUITE_TITLE',
  GET_CURRENT_AUTH = 'GET_CURRENT_AUTH',
  GET_DIRECTORY_DATA = 'GET_DIRECTORY_DATA',
  GET_ANCHOR_TOP = 'GET_ANCHOR_TOP',
  HIGHLIGHT_ANCHOR = 'HIGHLIGHT_ANCHOR',
  GET_SUPPORTED_EXPORT_FORMATS = 'GET_SUPPORTED_EXPORT_FORMATS',
  GET_TRANSLATE_LANG = 'GET_TRANSLATE_LANG',
  ADD_NEW_COMMENT = 'ADD_NEW_COMMENT',
  JUMP_TO_COMMENT = 'JUMP_TO_COMMENT',

  // 监听能力
  DOC_EDITOR_SCROLL = 'DOC_EDITOR_SCROLL',
  SEARCH_BOX_OPEN = 'SEARCH_BOX_OPEN',
  SEARCH_CONTROLLER_READY = 'SEARCH_CONTROLLER_READY',
  IMAGE_VIEW = 'IMAGE_VIEW',
  SELECTION_CHANGE = 'SELECTION_CHANGE',
  DOCUMENT_HEIGHT = 'DOCUMENT_HEIGHT',
  AUTH_CHANGE = 'AUTH_CHANGE',
  SUITE_TITLE_CHANGE = 'SUITE_TITLE_CHANGE',
  DIRECTORY_CHANGE = 'DIRECTORY_CHANGE',
  CURR_ANCHOR = 'CURR_ANCHOR',
  FULL_SCREEN_MODE = 'FULL_SCREEN_MODE',
  TRANSLATE_CHANGE = 'TRANSLATE_CHANGE',
  HYPERLINK_CLICK = 'HYPERLINK_CLICK',
  ON_CREATE_TEMP_COMMENT = 'ON_CREATE_TEMP_COMMENT',
  ON_ACTIVE_COMMENT = 'ON_ACTIVE_COMMENT',
}

export interface DocComponentInvokeEventPayloads {
  [DocComponentEvent.JUMP_TO_COMMENT]: {
    args: [{ commentId: string }];
    data: void;
  };
  [DocComponentEvent.ADD_NEW_COMMENT]: {
    args: [{ tempCommentId: string; content?: string; notify?: boolean }];
    data: { commentId: string; replyId: string };
  };
  [DocComponentEvent.HAS_UNFINISHED_TASK]: {
    args: [];
    data: { hasUnFinishedTask: boolean; hasUnFinishedFileTask: boolean };
  };
  [DocComponentEvent.SCROLL_TO]: {
    args: [value: number, style?: Record<string, string | number>];
    data: void;
  };
  [DocComponentEvent.TOGGLE_REPLACE_BOX]: {
    args: [visible?: boolean, style?: Record<string, string | number>];
    data: void;
  };
  [DocComponentEvent.TOGGLE_MODAL]: {
    args: ['CLONE' | 'DETAIL' | 'DELETE' | (string & {}), visible?: boolean];
    data: void;
  };
  [DocComponentEvent.TOGGLE_PRINT_BOX]: {
    args: [visible?: boolean];
    data: void;
  };
  [DocComponentEvent.TOGGLE_SHARE_MENU]: {
    args: [visible?: boolean, style?: Record<string, string | number>];
    data: void;
  };
  [DocComponentEvent.TOGGLE_COMMENT_HISTORY]: {
    args: [visible?: boolean];
    data: void;
  };
  [DocComponentEvent.TOGGLE_HISTORY]: {
    args: [visible?: boolean];
    data: void;
  };
  [DocComponentEvent.REPORT_ABUSE]: {
    args: [];
    data: void;
  };
  [DocComponentEvent.EXPORT_BY_TYPE]: {
    args: [format: string];
    data: void;
  };
  [DocComponentEvent.TOGGLE_TRANSLATE]: {
    args: [true, language: string];
    data: void;
  };
  [DocComponentEvent.ANCHOR_JUMP]: {
    args: [anchor: string, animate?: boolean];
    data: void;
  };
  [DocComponentEvent.GET_SUITE_TITLE]: {
    args: [];
    data: string;
  };
  [DocComponentEvent.GET_CURRENT_AUTH]: {
    args: [];
    data: {
      /** 是否为文档所有者 */
      owner: boolean;
      /** 是否有文档阅读权限 */
      readable: boolean;
      /** 是否有文档编辑权限 */
      editable: boolean;
      /** 是否有文档评论权限 */
      commentable: boolean;
      /** 是否有文档分享权限 */
      shareable: boolean;
      /** 是否有文档复制权限 */
      copyable: boolean;
      /** 是否有文档打印权限 */
      printable: boolean;
      /** 是否有文档导出权限 */
      exportable: boolean;
    };
  };
  [DocComponentEvent.GET_DIRECTORY_DATA]: {
    args: [];
    data: Array<{
      /** 锚点 hash 值 (初始化时获取的数据不包含此项) */
      anchor?: string;
      /** 目录标题 */
      text: string;
      /** 缩进等级 */
      indentLevel: number;
    }>;
  };
  [DocComponentEvent.GET_ANCHOR_TOP]: {
    args: [anchor: string];
    data: number;
  };
  [DocComponentEvent.HIGHLIGHT_ANCHOR]: {
    args: [anchor: string];
    data: void;
  };
  [DocComponentEvent.GET_SUPPORTED_EXPORT_FORMATS]: {
    args: [];
    data: string[];
  };
  [DocComponentEvent.GET_TRANSLATE_LANG]: {
    args: [];
    data: string[];
  };
}

export type InvokeEventType = keyof DocComponentInvokeEventPayloads | string;
export type InvokeEventArgs<E extends InvokeEventType> =
  E extends keyof DocComponentInvokeEventPayloads
    ? DocComponentInvokeEventPayloads[E]['args']
    : any[];
export type InvokeEventReturn<E extends InvokeEventType> =
  E extends keyof DocComponentInvokeEventPayloads
    ? DocComponentInvokeEventPayloads[E]['data']
    : any;

export type DocComponentListenerCallbacksPayloads = {
  [DocComponentEvent.ON_ACTIVE_COMMENT]: { commentId: string };
  [DocComponentEvent.ON_CREATE_TEMP_COMMENT]: { quote: string; tmpCommentId: string };
  [DocComponentEvent.DOC_EDITOR_SCROLL]: number;
  [DocComponentEvent.SEARCH_BOX_OPEN]: { duration: number; openTimes: number };
  [DocComponentEvent.SEARCH_CONTROLLER_READY]: {
    searchReadyTime: number;
    trigger_before_didmount: boolean;
  };
  [DocComponentEvent.IMAGE_VIEW]: {
    key: string;
    url: string;
    blob: Blob;
  };
  [DocComponentEvent.SELECTION_CHANGE]: {
    id: string;
    range: [number, number];
  }[];
  [DocComponentEvent.DOCUMENT_HEIGHT]: number;
  [DocComponentEvent.AUTH_CHANGE]: DocComponentInvokeEventPayloads[DocComponentEvent.GET_CURRENT_AUTH]['data'];
  [DocComponentEvent.SUITE_TITLE_CHANGE]: string;
  [DocComponentEvent.DIRECTORY_CHANGE]: {
    anchor: string;
    text: string;
    indentLevel: number;
  }[];
  [DocComponentEvent.CURR_ANCHOR]: string;
  [DocComponentEvent.FULL_SCREEN_MODE]: boolean;
  [DocComponentEvent.TRANSLATE_CHANGE]: string;
  [DocComponentEvent.HYPERLINK_CLICK]: string;
};
export type ListenerEventType = keyof DocComponentListenerCallbacksPayloads | string;
export type ListenerEventCallbackPayload<E extends ListenerEventType> =
  E extends keyof DocComponentListenerCallbacksPayloads
    ? DocComponentListenerCallbacksPayloads[E]
    : any;

/** 错误类型枚举 */
export enum ErrorType {
  NO_PERMISSION = '4',
  NOTE_DELETED = '1002',
  NOT_FOUND = '1004',
  NETWORK_ERR = '-8',
  REQUEST_FAIL = '1',
  NOT_SUPPORT = '-100',
  LOAD_ERROR = '-500',
}

/** 主题类型 */
export type Theme = 'light' | 'dark';

/** 页面模式 */
export type ContentMode = 'default' | 'wide';

/** 链接打开方式 */
export type HyperlinkHandler = 'inner' | 'outer';

/** 图片预览方式 */
export type ImageViewer = 'inner' | 'outer';

/** 自定义划词工具栏项 */
export interface CustomToolBoxItem {
  /** Icon 图标，如 'PaSelfReviewOutlined' */
  icon: string;
  /** 按钮文字 */
  text: string;
  /** 映射的动作类型，如 'Comment' */
  type: string;
}

/** 功能配置接口 */
export interface FeatureConfig {
  extensions?: {
    /** 头部配置 */
    suiteNavBar?: {
      /** 是否显示头部 */
      disable?: boolean;
      docComponentHeader?: {
        /** 背景颜色 */
        color?: string;
        /** header 高度 */
        height?: number;
        /** 底线配置 */
        bottomLine?: {
          disable?: boolean;
        };
        /** 更多菜单配置 */
        moreMenu?: {
          enable?: boolean;
          items?: {
            findAndReplace?: { enable?: boolean };
            applyEditPermission?: { enable?: boolean };
            clone?: { enable?: boolean };
            export?: { enable?: boolean };
            detailV2?: { enable?: boolean };
            history?: { enable?: boolean };
            commentVersion?: { enable?: boolean };
            translateToLang?: { enable?: boolean };
            print?: { enable?: boolean };
            delete?: { enable?: boolean };
            docMiniApp?: { enable?: boolean };
          };
        };
        /** 分享按钮配置 */
        shareBtn?: {
          enable?: boolean;
          border?: boolean;
          text?: string;
          visibleConfig?: {
            invite?: boolean;
            shareLink?: boolean;
            shareMethod?: boolean;
          };
        };
        /** 协作者头像 */
        collabAvatar?: {
          enable?: boolean;
        };
      };
    };
    /** 内容配置 */
    content?: {
      /** 页宽设置 */
      mode?: ContentMode;
      /** 是否只读模式 */
      readonly?: boolean;
      /** 是否显示标题 */
      titleVisible?: boolean;
      /** 文档内边距 */
      padding?: number[];
      /** 内容最大宽度 */
      maxWidth?: number;
      /** 打开链接方式 */
      hyperlinkHandler?: HyperlinkHandler;
      /** 背景颜色 */
      background?: string;
      /** 滚动条配置 */
      scrollbar?: {
        enable?: boolean;
      };
      /** 是否允许滚动 */
      unscrollable?: boolean;
      /** 边框配置 */
      border?: {
        enable?: boolean;
      };
      /** 划词工具栏 */
      toolbox?: {
        enable?: boolean;
        customToolBoxItem?: CustomToolBoxItem[];
        hideItems?: string[];
      };
    };
    /** 评论配置 */
    comment?: {
      partial?: {
        disable?: boolean;
        visible?: boolean;
        open?: boolean;
      };
      global?: {
        disable?: boolean;
      };
      appUserCanComment?: boolean;
    };
    /** 图片配置 */
    image?: {
      viewer?: ImageViewer;
      needBlob?: boolean;
      maxWidth?: number;
    };
    /** 目录配置 */
    directory?: {
      disable?: boolean;
      pin?: boolean;
    };
    /** 点赞配置 */
    like?: {
      disable?: boolean;
    };
    /** 底部配置 */
    footer?: {
      enable?: boolean;
    };
    /** 模态窗配置 */
    modal?: {
      outerMask?: {
        enable?: boolean;
        zIndex?: number;
      };
    };
    /** 全屏配置 */
    fullscreen?: {
      enable?: boolean;
    };
  };
}

/** 鉴权配置 */
export interface AuthConfig {
  /** 当前登录用户的 open id */
  openId?: string;
  /** 签名 */
  signature: string;
  /** 应用 appId */
  appId: string;
  /** 时间戳（毫秒） */
  timestamp: number;
  /** 随机字符串 */
  nonceStr: string;
  /** 参与签名加密计算的 url */
  url: string;
  /** 指定要使用的组件 */
  jsApiList: string[];
}

/** 组件尺寸配置 */
export interface SizeConfig {
  /** 组件宽度 */
  width?: string | number;
  /** 组件高度 */
  height?: string | number;
  /** 组件最小高度 */
  minHeight?: string | number;
}

/** 组件配置选项 */
export interface DocComponentOptions {
  /** 文档对应 URL */
  src: string;
  /** 挂载节点 */
  mount: HTMLElement;
  /** 功能配置 */
  config?: FeatureConfig;
  /** 组件主题色 */
  theme?: Theme;
  /** 组件尺寸 */
  size?: SizeConfig;
  /** 三方鉴权 */
  auth?: AuthConfig;
  /** 组件内部回调 */
  onError?: (error: { code: string; msg: string }) => void;
  /** 鉴权失败回调 */
  onAuthError?: (error: any) => void;
  /** 挂载成功回调 */
  onMountSuccess?: () => void;
  /** 挂载超时回调 */
  onMountTimeout?: () => void;
}

/** SDK 响应接口 */
export interface SDKResponse<T = any> {
  code: number;
  msg: string;
  data?: T;
}

/** 文档组件实例接口 */
export interface DocComponentInstance {
  /** 启动组件 */
  start(): Promise<void>;
  /** 销毁组件 */
  destroy(): void;
  /** 调用组件能力 */
  invoke<E extends InvokeEventType>(
    event: E,
    ...args: InvokeEventArgs<E>
  ): Promise<SDKResponse<InvokeEventReturn<E>>>;
  /** 注册事件监听 */
  register<E extends ListenerEventType>(
    event: E,
    callback: (payload: ListenerEventCallbackPayload<E>) => void
  ): void;
  /** 取消事件监听 */
  unregister(event: ListenerEventType, callback: (...args: any[]) => void): void;
  /** 设置功能配置 */
  setFeatureConfig(config: FeatureConfig): void;
  /** 切换文档 */
  replace(src: string): void;
  /** 刷新文档 */
  refresh(): void;
}

/** 全局 Window 接口扩展 */
declare global {
  interface Window {
    DocComponentSdk: new (options: DocComponentOptions) => DocComponentInstance;
  }
}
