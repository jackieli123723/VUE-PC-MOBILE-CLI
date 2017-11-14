import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

export default fac.call(new VueRouter({
    routes,
}));


/**
 * 工厂模式
 */
function fac() {
    return this.beforeEach(fun) && this;
}


/**
 * 路由回调
 */
function fun(to, from, next) {
    ass(localStorage['auth'], {
        // 已认证
        suc() {
            ass(to.path.match('login'), {
                suc: next.bind(null, '/'),
                err: next,
            });
        },
        // 未认证
        err() {
            ass(to.path.match('login'), {
                suc: next,
                err: next.bind(null, '/login'),
            });
        },
    });
}


/**
 * 断言工厂
 */
function ass(con, opt = {}) {
    con ? opt.suc && opt.suc() : opt.err && opt.err();
}