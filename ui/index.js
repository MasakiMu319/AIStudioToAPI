/**
 * File: ui/index.js
 * Description: Main entry point for the Vue application, initializing Vue, Element Plus, router and i18n
 *
 * Maintainers: iBenzene, bbbugg
 * Original Author: Ellinav
 */

import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './app/App.vue';
import router from './app/router';
import I18n from './app/utils/i18n';
import './app/styles/status.less';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);

I18n.init().finally(() => {
    app.mount('#app');
});
