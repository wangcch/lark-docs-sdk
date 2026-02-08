<template>
  <div ref="containerRef" :style="containerStyle"></div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import type {
  DocComponentOptions,
  FeatureConfig,
  SDKResponse,
  InvokeEventType,
  InvokeEventArgs,
  InvokeEventReturn,
  ListenerEventType,
  ListenerEventCallbackPayload,
} from 'lark-docs-sdk';
import { LarkDocsComponent } from 'lark-docs-sdk';

export interface LarkDocsProps {
  /** 文档 URL */
  src: string;
  /** 鉴权配置 */
  auth?: DocComponentOptions['auth'];
  /** 功能配置 */
  config?: FeatureConfig;
  /** 主题 */
  theme?: 'light' | 'dark';
  /** 宽度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
  /** 最小高度 */
  minHeight?: string | number;
}

const props = withDefaults(defineProps<LarkDocsProps>(), {
  theme: 'light',
  width: '100%',
  height: 'auto',
  minHeight: '500px',
});

const emit = defineEmits<{
  error: [error: { code: string; msg: string }];
  authError: [error: any];
  mountSuccess: [];
  mountTimeout: [];
  ready: [component: LarkDocsComponent];
}>();

const containerRef = ref<HTMLElement>();
const component = shallowRef<LarkDocsComponent>();

const containerStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
  }

  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  }

  if (props.minHeight && props.height === 'auto') {
    style.minHeight =
      typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight;
  }

  return style;
});

// 初始化组件
const initComponent = async () => {
  if (!containerRef.value) return;

  const options: DocComponentOptions = {
    src: props.src,
    mount: containerRef.value,
    auth: props.auth,
    config: props.config,
    theme: props.theme,
    size: {
      width: props.width,
      height: props.height,
      minHeight: props.minHeight,
    },
    onError: error => emit('error', error),
    onAuthError: error => emit('authError', error),
    onMountSuccess: () => emit('mountSuccess'),
    onMountTimeout: () => emit('mountTimeout'),
  };

  component.value = new LarkDocsComponent(options);

  try {
    await component.value.start();
    emit('ready', component.value);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    emit('error', { code: 'INIT_ERROR', msg: message });
  }
};

watch(
  () => props.src,
  newSrc => {
    if (component.value) {
      component.value.replace(newSrc);
    }
  }
);

watch(
  () => props.config,
  newConfig => {
    if (component.value && newConfig) {
      component.value.setFeatureConfig(newConfig);
    }
  },
  { deep: true }
);

onMounted(() => {
  initComponent();
});

onBeforeUnmount(() => {
  if (component.value) {
    component.value.destroy();
  }
});

defineExpose({
  invoke: <E extends InvokeEventType>(
    event: E,
    ...args: InvokeEventArgs<E>
  ): Promise<SDKResponse<InvokeEventReturn<E>>> => {
    if (!component.value) {
      return Promise.reject(new Error('Component not initialized'));
    }
    return component.value.invoke(event, ...args);
  },
  register: <E extends ListenerEventType>(
    event: E,
    callback: (payload: ListenerEventCallbackPayload<E>) => void
  ): void => {
    if (!component.value) {
      throw new Error('Component not initialized');
    }
    component.value.register(event, callback);
  },
  unregister: <E extends ListenerEventType>(
    event: E,
    callback: (payload: ListenerEventCallbackPayload<E>) => void
  ): void => {
    if (!component.value) {
      throw new Error('Component not initialized');
    }
    component.value.unregister(event, callback);
  },
  setFeatureConfig: (config: FeatureConfig): void => {
    if (!component.value) {
      throw new Error('Component not initialized');
    }
    component.value.setFeatureConfig(config);
  },
  replace: (src: string): void => {
    if (!component.value) {
      throw new Error('Component not initialized');
    }
    component.value.replace(src);
  },
  refresh: (): void => {
    if (!component.value) {
      throw new Error('Component not initialized');
    }
    component.value.refresh();
  },
  getComponent: (): LarkDocsComponent | undefined => {
    return component.value;
  },
});
</script>
