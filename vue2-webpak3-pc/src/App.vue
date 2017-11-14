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
                        <span class="del-confirm-sure" @click='deleteClick(index)'>删除</span>
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
        <div class="box" v-bind:class="{ 'checked': changecheck }" @click="change()" >
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
  // watch: {
  //   items: {
  //     handler (val, oldval) {
  //       Store.save(val)
  //     },
  //     deep: true
  //   }
  // },
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
    deleteClick (index) {
      this.show = false
      this.items.splice(index, 1)
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
        this.items.forEach((item) => item['checked'] = true )
        // this.items.forEach(function(item){
        //   item.checked = true
        // })
      } else {
        this.changecheck = false
        this.items.forEach((item) => item['checked'] = false )
        // this.items.forEach(function(item){
        //   item.checked = false
        // })
      }
    }
  }

}
</script>


<!--
<style lang="less" scope>
    @import "./css/main.css";
    或者写入less 都可以 演示用引用
</style>  -->

<!--
<style>
    @import "./css/main.css";
</style>  -->

<style lang="less" scope>
    @import "./css/all.less";
</style>
