<template>
  <div id="app" class="reminder-container" v-cloak>

    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <h1 v-text="title"></h1>
    <br/>
    <input id='add-input' type="text" v-model='newItem' @keyup.enter='addNew' placeholder='enter输入' />
    <ul class="reminders">
        <li v-for='(item, index) in items'>
            <h3 @mouseenter='itemEnter(item)' @mouseleave='itemLeave(item)'>
            <!-- <input type='checkbox' @click='itemCheck(item)'> -->
            <div class="box"  v-bind:class="{ 'checked': item.checked }" @click="chooseCheck(item)">
              <i class="checkbox-icon"></i>
            </div>
            <p class='item-label' v-bind:class="{ 'line-through': item.checked }">{{ index + 1 }}.{{ item.label }} </p>
            <p class='item-status done' v-if='item.checked'>已完成</p>
            <p class="item-status " v-else>未完成</p>
            <p class='item-delete' v-if='item.showDelete' @click='openDialog()'>&#215;</p>
          </h3>
            <div class="dialog" v-if="show" @click='close()'>
                <div class="del-confirm-box">
                    <div class="del-confirm-text">
                        <img src="./assets/app-sure-del.png">
                        <span>你确定要删除吗?</span>
                        <span class="forver">此条信息将会被永久删除</span>
                    </div>
                    <div class="del-confirm-btn">
                        <span class="del-confirm-sure" @click='deleteClick(item)'>删除</span>
                        <span class="del-confirm-cancel" @click='close()'>取消</span>
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <div class="mask" v-if="show" @click='close()'></div>
    <div class="notification" v-if="delflag" transition="slide">
        <div class="content">
            删除成功
        </div>
    </div>
    <div class="bt">
        <div class="box" v-bind:class="{ 'checked': changecheck }" @click="change()">
            <i class="checkbox-icon"></i>
        </div>
        <span class="all">{{!changecheck ? "全选" : "反选" }}</span>
        <span @click="allDel()" class="clear-all">清空</span>
    </div>
    <div class="events clearfix">
        <span class="fl">待办事项<strong class="hope">{{items.length - doneResult() }}</strong></span>
        <span class="fl">完成事项<strong class="done">{{doneResult()}}</strong></span>
        <span class="fr">总共事项<strong class="total">{{items.length}}</strong></span>
    </div>

</div>

</template>

<script>
import Hello from './components/Hello'
import Store from './lib/store'
export default {
  name: 'app',
  components: {
    Hello
  },
  data () {
    return {
      items: Store.fetch(),
      newItem: '',
      title: '添加自己的工作计划(vue.js)',
      show: false,
      delflag: false,
      changecheck: false
    }
  },
  watch: {
    items: {
      handler (items) {
        Store.save(items)
      },
      deep: true
    }
  },
  methods: {
    addNew () {
      if (this.newItem === '') {
        window.alert('不能为空')
        return
      }
      this.items.push({
        label: this.newItem,
        checked: false,
        showDelete: false
      })
      this.newItem = ''
    },
    itemEnter (item) {
      item.showDelete = true
    },
    itemLeave (item) {
      item.showDelete = false
    },
    deleteClick (item) {
      this.show = false
      this.items.$remove(item)
    },
    chooseCheck (item) {
      item.checked = !item.checked
    },
    doneResult () {
      var doneResult = 0
      this.items.forEach((item) => item['checked'] ? doneResult++ : 0)
      return doneResult
    },
    close () {
      this.show = false
    },
    openDialog () {
      this.show = true
    },
    allDel () {
      if (window.confirm('确定要清空数据吗？')) {
        this.items = []
      }
    },
    change () {
      if (!this.changecheck) {
        this.changecheck = true
      } else {
        this.changecheck = false
      }
      this.items.forEach((item) => item['checked'] ? !item.checked : item.checked)
    }
  }

}
</script>



<style>
* {
        margin: 0;
        padding: 0;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    ::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.2)
    }

    :-moz-placeholder {
        color: rgba(255, 255, 255, 0.2)
    }

    ::-moz-placeholder {
        color: rgba(255, 255, 255, 0.2)
    }

    :-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.2)
    }

    ol,
    ul,
    li {
        list-style: none;
    }

    img {
        border: 0 none;
    }

    a,
    input,
    textarea {
        outline: none;
    }

    .clearfix {
        *zoom: 1;
    }

    .clearfix:after {
        clear: both;
        content: '';
        display: block;
        height: 0;
        visibility: hidden;
    }

    .fr {
        float: left;
    }

    .fr {
        float: right
    }

    body {
        background-color: #16a085;
        font-family: "Lato", sans-serif;
        height: 2000px;
        color: white
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        height: 30px;
    }

    #add-input {
        margin: 0 auto;
        display: block
    }

    .item-status {
        display: inline;
        background: red;
        color: white;
        padding: 2px;
        font-size: 12px;
    }

    .item-status.done {
        background: green;
        color: #fff;
    }

    .item-delete {
        display: inline;
        font-size: 20px;
        color: gray;
        cursor: pointer;
        position: absolute;
        top: 8px;
        right: 4px;
    }

    .item-label {
        display: inline;
        color: #444;
        font-size: 20px;
    }

    .line-through {
        text-decoration: line-through;
        color: green;
    }

    .logo {
        width: 100px;
        height: 100px;
    }

    .reminders {
        list-style-type: none;
        max-width: 500px;
        margin: 30px auto
    }

    input[type='text'] {
        width: 430px;
        height: 50px;
        border: none;
        background-color: transparent;
        font-size: 20px;
        font-weight: 300;
        color: white;
        padding: 5px 10px;
        -webkit-transition: all .3s ease;
        -o-transition: all .3s ease;
        transition: all .3s ease;
        background-color: rgba(0, 0, 0, .15);
    }

    .reminders {
        list-style-type: none;
        max-width: 430px;
        margin: 30px auto
    }

    .reminders li {

        font-weight: 400;
        /*box-shadow: 0 7px 0 -4px rgba(0, 0, 0, 0.2);*/
        color: #444;
        text-align: left;
        min-height: 50px;
        line-height: 30px;
        font-size: 20px;
        background-color: white;
        margin-bottom: 10px;
        padding: 10px;
        position: relative;
        word-wrap: break-word;
        -webkit-transition: all .1s ease;
        -o-transition: all .1s ease;
        transition: all .1s ease
    }

	.reminders li.removed-item {
  -webkit-animation: removed-item-animation .8s cubic-bezier(.65,-0.02,.72,.29);
  -o-animation: removed-item-animation .8s cubic-bezier(.65,-0.02,.72,.29);
  animation: removed-item-animation .8s cubic-bezier(.65,-0.02,.72,.29)
}

@keyframes removed-item-animation {
  0% {
    opacity: 1;
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    -o-transform: translateX(0);
    transform: translateX(0)
  }

  30% {
    opacity: 1;
    -webkit-transform: translateX(50px);
    -ms-transform: translateX(50px);
    -o-transform: translateX(50px);
    transform: translateX(50px)
  }

  80% {
    opacity: 1;
    -webkit-transform: translateX(-800px);
    -ms-transform: translateX(-800px);
    -o-transform: translateX(-800px);
    transform: translateX(-800px)
  }

  100% {
    opacity: 0;
    -webkit-transform: translateX(-800px);
    -ms-transform: translateX(-800px);
    -o-transform: translateX(-800px);
    transform: translateX(-800px)
  }
}

    .reminders li:focus {
        outline: none;
    }

    .reminders li.isFinshed {
        text-decoration: line-through;
        color: green;
    }

    .reminder-container h1 {
        text-align: center;
        margin: 50px auto 20px;
    }

    .reminder-container h3 {
        font-weight: normal;
        padding-left: 30px;
		overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

    }

    .box {
        width: 18px;
        height: 18px;
        position: absolute;
        left: 10px;
        top: 10px;
    }

    .checkbox-icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 10px;
        border-radius: 2px;
        border: 1px solid #16a085;
    }

    .checkbox-icon:after {
        content: '';
    }

    .box.checked .checkbox-icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 10px;
        border-radius: 2px;
        border: 1px solid #16a085;
    }

    .box.checked .checkbox-icon:after {
        content: '';
        display: block;
        width: 9px;
        height: 5px;
        border-bottom: 2px solid #16a085;
        border-left: 2px solid #16a085;
        margin: 3px 0 0 3px;
        -webkit-transform: rotate(-45deg) skew(0deg, -12deg);
        -moz-transform: rotate(-45deg) skew(0deg, -12deg);
        -ms-transform: rotate(-45deg) skew(0deg, -12deg);
        -o-transform: rotate(-45deg) skew(0deg, -12deg);
        transform: rotate(-45deg) skew(0deg, -12deg)
    }

    .events {
        width: 430px;
        height: 30px;
        line-height: 30px;
        margin: 0 auto;
    }

    .hope {
        color: red;
    }

    .done {
        color: green;
    }

    .total {
        color: #fff;
    }

    [v-cloak] {
        display: none;
    }

    .mask {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .3);

    }

	.dialog{
	   position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index:44;
	}

    .del-confirm-box {
    z-index:45;
    width: 309px;
    height: 139px;
    background: #fff;
	border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -155px;
    margin-top: -70px;

}
.del-confirm-box .del-confirm-text {
  margin-top: 30px;
  position: relative;
  height: 40px;
  line-height: 1.4;
  padding-left: 50px;
  font-size: 14px;
  color: #1a1a1a;
}
.del-confirm-box .del-confirm-text img {
  float: left;
  margin-top: 4px;
  margin-right: 16px;
}
.del-confirm-box .del-confirm-text span {
  display: block;
}
.del-confirm-box .del-confirm-text span.forver {
  color: #999;
}
.del-confirm-box .del-confirm-btn {
  margin: 15px auto 0;
  text-align: center;
}
.del-confirm-box .del-confirm-btn span {
  width: 60px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  font-size: 12px;
  color: #fafafa;
  display: inline-block;
  *display: inline;
  *zoom: 1;
  cursor: pointer;
}
.del-confirm-box .del-confirm-sure {
  margin-right: 10px;
  background: #f75b49;
}
.del-confirm-box .del-confirm-cancel {
  background: #1a9af3;
}

 .slide-transition{
    transition: all .3s ease;
    transform: translate3d(0, 0, 0);
 }
 .slide-enter,.slide-leave{
 transform: translate3d(0, -100%, 0);
 }

 .notification{
    width: 100%;
    line-height: 2;
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
	text-align:center;
	color: rgb(255, 255, 255);
	background: rgb(33, 231, 182);

}
 .content{
	  padding: .75rem 2rem
	}

.bt{
position:relative;
width:430px;


margin:0 auto 10px;
height:40px;
}

.bt .checkbox-icon{
 border-color:#fff;
}

.bt .box.checked .checkbox-icon:after{
 border-color:#fff;
}

.bt .box.checked .checkbox-icon{
 border-color:#fff;
}

.all{
 line-height:40px;
 padding-left:40px;
}
.clear-all{
     background-color: rgba(0,0,0,.25);
    font: 300 18px "Lato", "Arial", sans-serif;
	    border: 0;

    padding: 10px 20px;
    color: white;
    float: right;
    cursor: pointer;

}

</style>

  <style>
      @import "./css/main.css";
  </style>
