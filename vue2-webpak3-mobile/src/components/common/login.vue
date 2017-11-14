<template>
    <div class="wrapper">
        <div class="container">
            <h3>小虎牙管理系统</h3>
            <div class="form-wrapper" @keyup.enter="handleSubmit">
                <ul>
                    <li>
                        <span>账户:</span>
                        <input autocomplete="off" type="text" v-model="form.user" />
                    </li>
                    <li>
                        <span>密码:</span>
                        <input autocomplete="off" type="password" v-model="form.password" />
                    </li>
                </ul>
                <button :class="{ disabled }" @click="handleSubmit">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    user: '',
                    password: '',
                },
            }
        },
        methods: {
            handleSubmit() {
                if (this.disabled) return;
                if (this.form.user === 'admin' && this.form.password === '123456') {
                    localStorage['auth'] = 'admin';
                    location.reload();
                }
                else {
                    this.$Message.error('对方不想说话，因为你故意输错的');
                }
            }
        },
        computed: {
            disabled() {
                return !Object.keys(this.form).every(key => this.form[key]);
            }
        }
    };
</script>

<style scoped lang="less">
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("http://www.17sucai.com/preview/668095/2017-07-19/perfect/img/demo-1-bg.jpg");
    }

    .container {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 400px;
        padding: 20px 0 40px;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 10px;
        transform: translate(-50%, -50%);
        transition: all .5s;
        &:hover {
            background-color: rgba(0, 0, 0, .7);
        }
        h3 {
            color: #fff;
            text-align: center;
            font-size: 20px;
            font-weight: bolder;
            letter-spacing: 1px;
        }
        .form-wrapper {
            width: 300px;
            margin: 0 auto;
            padding-top: 20px;
            ul {
                margin-top: -20px;
                li {
                    box-shadow: 0 0 0 2px #000;
                    margin-top: 20px;
                    font-size: 14px;
                    line-height: 43px;
                    border-radius: 4px;
                    overflow: hidden;
                    span {
                        float: left;
                        width: 50px;
                        color: #fff;
                        text-align: center;
                        font-weight: bolder;
                        letter-spacing: 1px;
                    }
                    input {
                        border: 0;
                        cursor: pointer;
                        outline: none;
                        width: 250px;
                        line-height: 43px;
                        text-indent: 15px;
                        letter-spacing: 1px;
                        border-radius: 50px;
                        background-color: #fff;
                    }
                }
            }
            button {
                border: 0;
                cursor: pointer;
                outline: none;
                display: block;
                width: 50%;
                height: 40px;
                margin: 30px auto 0;
                color: #fff;
                font-size: 16px;
                font-weight: bolder;
                background-color: #0096e6;
                border-radius: 50px;
            }
            button.disabled {
                cursor: not-allowed;
                background-color: #cccccc;
            }
        }
    }
</style>