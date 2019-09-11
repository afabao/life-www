<template>
  <div>
    <div>
      <div align="center">
        <el-date-picker
          v-model="queryCondition.ffeeBeginTime"
          type="date"
          placeholder="开始日期">
        </el-date-picker>
        -
        <el-date-picker
          v-model="queryCondition.ffeeEndTime"
          type="date"
          placeholder="结束日期">
        </el-date-picker>
        <el-button @click="queryPay">查询</el-button>
      </div>


      <div style="margin-top: 100px">
        <div id="PayData" style="width: 600px; height: 300px; float: left"></div>
        <div id="account" style="width: 300px; height: 300px; float: right"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        queryCondition:{
          ffeeUserId: this.$cookies.get('USER_ID'),
          ffeeBeginTime: '',
          ffeeEndTime: ''
        },
        ffeeName:[],
        ffeeTotalPay:[],
        accountData: []
      }
    },

    //初始化区
    mounted(){
      this.queryPay();
    },

    //方法区
    methods: {
      //柱状图
      payData(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('PayData'))
        // 绘制图表
        myChart.setOption({
          title: {text: '费用支出'},
          tooltip: {},
          xAxis: {
            data: this.ffeeName
          },
          yAxis: {},
          series: [{
            name: '总额',
            type: 'bar',
            data: this.ffeeTotalPay
          }]
        });
      },

      //饼图
      account(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('account'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '收入VS支出'
          },
          tooltip: {},
          // legend: {
          //   type: 'scroll',
          //   orient: 'vertical',
          //   right: 10,
          //   top: 20,
          //   bottom: 20,
          //   data: this.ffeeName
          // },
          series: [{
            name: '总额',
            type: 'pie',
            data: this.accountData,
          }]
        });
      },
      async queryPay(){
        var token = this.$cookies.get('USER_TOKEN');
        await this.$axiso.post('/api/queryPay',this.queryCondition,{
          headers:{
            'Content-Type':'application/json;charset=UTF-8'
          }
        }).then((response) => {
          if (token == null) {
            this.$alert('暂无权限，其重新登陆', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.href = response.request.responseURL;
              }
            })
          }else {
            if (response.status == 200) {
              let tempName = [];
              this.ffeeTotalPay = [];
              for(let item of response.data.data){
                tempName.push(item.feeTypeName);
                this.ffeeTotalPay.push(item.sumPay)
              }
              this.ffeeName = tempName;
              this.payData();
            }
          }
        }).catch(reason => {

        });

        await this.$axiso.post('/api/queryAccount',this.queryCondition,{
          headers:{
            'Content-Type':'application/json;charset=UTF-8'
          }
        }).then((response) =>{
          if (token == null) {
            this.$alert('暂无权限，其重新登陆', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.href = response.request.responseURL;
              }
            })
          }else {
            if (response.status == 200){
              this.accountData = [];
              for(let item of response.data.data){
                this.accountData.push(item)
              }
              this.account();
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
