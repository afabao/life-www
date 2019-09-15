<template>
    <div style="margin-top: 0px">
      <el-container>
        <el-header>
          <el-menu
            :default-active="activeIndex2"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            >
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            <el-menu-item index="4" style="margin-left: 900px">{{userName}}</el-menu-item>
            <el-menu-item index="5" style="margin-left: 10px" @click="logout">退出</el-menu-item>
          </el-menu>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-row>
              <el-col :span="12">
                <el-menu
                  :default-active="$router.path"
                  router
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>我的费用</span>
                    </template>
                    <el-menu-item-group>
<!--                      <template slot="title">分组一</template>-->
                      <el-menu-item index="/MyFee">费用详情</el-menu-item>
                      <el-menu-item index='/FeeCharts'>费用图表</el-menu-item>
                    </el-menu-item-group>
<!--                    <el-menu-item-group title="分组2">-->
<!--                      <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--                    </el-menu-item-group>-->
<!--                    <el-submenu index="1-4">-->
<!--                      <template slot="title">选项4</template>-->
<!--                      <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--                    </el-submenu>-->
                  </el-submenu>
                  <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                  </el-menu-item>
                  <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>配置</template>
                      <el-menu-item index="/feeType" @click="feeType">费用类型配置</el-menu-item>
                  </el-submenu>
                </el-menu>
              </el-col>
            </el-row>
          </el-aside>
          <el-container>
            <el-main>
              <router-view/>
            </el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        userName: ''
      }
    },

    methods:{
      logout() {
        axios.get('/api/logout').then((response) => {
          if(response.data.code == 200){
            window.location.href="http://172.16.42.133"
          }
        })
      }
    },

    mounted () {
      this.userName = this.$cookies.get('USER_NAME');
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    padding: 0 0;
    /*text-align: center;*/
    /*line-height: 60px;*/
    /*width: 100%;*/
    /*margin: 0px;*/
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    /*text-align: center;*/
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 160px;*/
    padding: 0 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-menu{
    flex: 0px;
    margin-left: 0px;
  }

  div{
    height:100%;
    width: 100%;
  }


</style>

<style type="text/css">
  /*
      找到html标签、body标签，和挂载的标签
      都给他们统一设置样式
  */
  html,body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
</style>
