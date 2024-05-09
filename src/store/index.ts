import type { App } from 'vue';
import { createPinia, Pinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const store: Pinia = createPinia();
store.use(piniaPluginPersistedstate);
export function setupStore(app: App<Element>): void {
  app.use(store);
}

export { store };
