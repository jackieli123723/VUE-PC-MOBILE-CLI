import axios from 'axios';

/**
 * axios
 * timeout: 6e5
 */
export default {
    install({ prototype: pro }) {
        pro.$fetch = fac.bind(pro);
    }
};


/**
 * 工厂模式
 */
function fac(opt) {
    if (this.$dialog.loading.open('请求中') || true) {
        return axios.create({ timeout: 6e5 })(fun.call(opt)).then(({ data }) => suc.call(this, data, opt.suc)).catch(({ message }) => err.call(this, message, opt.err));
    }
}


/**
 * 包装入参
 */
function fun() {
    return Object.assign(this.method && this.method.toLowerCase() === 'post' ? this.data || (this.data = {}) : this.params || (this.params = {}), { auth: localStorage['auth'] }) && this;
}


/**
 * 成功回调
 */
function suc(res, cb = function () { }) {
    if (Object.prototype.toString.call(res).slice(8, -1).toLowerCase() !== 'object') return;
    if (this.$dialog.loading.close() || Number.isInteger(res.code)) {
        if (res.code === 0) return cb(res);
        this.$dialog.toast({ mes: 'Code no equal 0' });
    } else {
        this.$dialog.toast({ mes: 'Code Type Error' });
    }
}


/**
 * 失败回调
 */
function err(msg, cb = function () { }) {
    if (this.$dialog.loading.close() || true) {
        cb() || this.$dialog.toast({ mes: '接口异常' });
    }
}