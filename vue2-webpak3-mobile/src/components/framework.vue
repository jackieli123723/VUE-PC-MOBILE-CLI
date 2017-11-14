<template>
    <div class="layout">
        <div class="layout-content">
            <router-view />
        </div>
        <div class="layout-menu">
            <yd-tabbar>
                <yd-tabbar-item v-for="(item, key) in menu" :key="key" :link="item.route" :title="item.title" :active="item.selected === 'selected'" @click.native="handleChangeMenuActive(item)">
                    <yd-icon :name="item.icon" slot="icon" size="0.54rem"></yd-icon>
                </yd-tabbar-item>
            </yd-tabbar>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menu: [
                    {
                        icon:  'home',
                        route: '/',
                        title: '首页',
                        selected: 'selected',
                    },
                    {
                        icon:  'home',
                        route: 'tmall',
                        title: '天猫',
                    },
                    {
                        icon:  'home',
                        route: 'taobao',
                        title: '淘宝',
                    }
                ]
            };
        },
        methods: {
            handleChangeMenuActive(curr) {
                this.menu = this.menu.map(item => (item === curr ? (item.selected = 'selected') : (item.selected = 'default')) && item);
            }
        }
    };
</script>

<style lang="less">
    .layout {
        height: 100%;
    }
    
    .layout-content {
        position: absolute;
        left: 50%;
        bottom: 1.1rem;
        max-width: 750px;
        width: 100%;
        height: 100%;
        transform: translateX(-50%);
        > div {
            height: 100%;
        }
    }
    
    .layout-menu {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }
</style>