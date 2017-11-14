<template>
    <div class="wrapper">
        <div class="container">
            <div class="txt-wrapper">
                <p class="title">404</p>
                <p class="describe">Oops! Sorry, Not Found</p>
                <button @click="$router.push('/')">GO BACK HOME</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    
    };
</script>

<style scoped lang="less">
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .img-wrapper {
            float: left;
            width: 200px;
            height: 250px;
            background-image: url("http://www.xmoban.cn/demo/404moban/06/images/tfans.jpg");
            background-size: cover;
            transform: translateY(-90px);
        }
        .txt-wrapper {
            float: left;
            margin-left: 30px;
            button {
                border: 0;
                outline: none;
                padding: 8px 16px;
                margin-top: 14px;
                color: #eee;
                background-color: #6dcb96;
                cursor: pointer;
            }
            .title {
                font-size: 50px;
                font-weigth: border;
                letter-spacing: 5px;
            }
            .describe {
                font-size: 22px;
                font-weigth: border;
                letter-spacing: 1px;
            }
        }
    }
</style>