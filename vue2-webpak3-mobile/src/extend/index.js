import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.flexible.js';
import Ydui from 'vue-ydui';
import Axios from './axios';
import Moment from './moment';

export default {
    install(Vue) {
        Vue.use(Ydui);
        Vue.use(Axios);
        Vue.use(Moment);
    }
};