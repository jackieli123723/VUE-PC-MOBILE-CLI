<template>
  <div id="app">
        <header class="header-fixed">
        <a href="javascript:history.go(-1);" class="header-pre"><img src="./assets/back.png" /></a>
        <h1>道具购买</h1>
        <button class="close">
            <a href="history.html"><img src="./assets/out.png" /></a>
        </button>
        <button class="order">
            <a href="history.html"><img src="./assets/order.png" /></a>
        </button>
    </header>
    <div class="content-wrapper">
 
        <div class="message-center-info">
            <span class="left-text">用户名：沉浮</span>
            <span class="line border border-right"></span>
            <span class="right-text">龙渊币余额：<i>100</i></span>
        </div>

        <ul class="tool-nav-choose clearfix">
            <li class="border border-all"><span>选择游戏</span></li>
            <li class="border border-all"><span>选择区服</span></li>
            <li class="border border-all"><span>Empire11319143</span></li>
        </ul>
      
  </div>

</template>

<script>

export default {
  name: 'app'
}
</script>




<style lang="less" scope>
    @import "./css/base.less";
    @import "./css/main.less";
</style>
