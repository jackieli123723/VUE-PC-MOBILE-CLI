import Moment from 'moment';

export default {
    install({ prototype: pro }) {
        pro.$moment = Moment;
    }
};