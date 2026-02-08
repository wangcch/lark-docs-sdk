import LarkDocs from './LarkDocs.vue';
import type { App, Plugin } from 'vue';

export { LarkDocs };

export * from 'lark-docs-sdk';

export const LarkDocsPlugin: Plugin = {
  install(app: App) {
    app.component('LarkDocs', LarkDocs);
  },
};
