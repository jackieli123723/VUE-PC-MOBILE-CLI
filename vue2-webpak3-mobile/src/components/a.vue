<template>
    <div>
        <iframe frameborder="0" width="100%" height="100%" src="//taobao.com" />
    </div>
</template>

<script>
    export default {
        created() {
            this.$fetch({
                url: '/123',
                method: 'post'
            });
        },
        data() {
            return {
                msg: '淘宝',
            };
        },
    }
</script>