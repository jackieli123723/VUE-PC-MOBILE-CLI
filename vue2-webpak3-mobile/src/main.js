import Vue from 'vue';
import Ext from 'extend';
import app from './app';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Ext);

new Vue({
    store,
    router,
    render: h => h(app),
}).$mount('#app');