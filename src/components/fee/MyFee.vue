<template>
  <div>
    <div>
      <el-button @click="addLine">添加费用</el-button>
      <el-autocomplete
        class="inline-input"
        v-model="searchCondition.ffeeTypeName"
        :fetch-suggestions="feeTypeSearch"
        placeholder="费用类型"
        @select="handleSelect"
      ></el-autocomplete>
      <el-input v-model="searchCondition.ffeeTypeId" v-if="show"></el-input>
      <el-select v-model="searchCondition.ffeeRp" placeholder="收/付">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="searchCondition.ffeeBeginTime"
        type="date"
        placeholder="开始日期">
      </el-date-picker>
      -
      <el-date-picker
        v-model="searchCondition.ffeeEndTime"
        type="date"
        placeholder="结束日期">
      </el-date-picker>
      <el-button @click="queryByCondition">查询</el-button>
    </div>
    <el-table
      :data="feeData"
      style="width: 100%"
      >
      <el-table-column prop="ffeeId" label="费用id" align="center" width="160" v-if="show">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ffeeId" placeholder="费用id" ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ffeeTypeId" label="费用类型id" align="center" width="160" v-if="show">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ffeeTypeId" placeholder="费用类型id"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ffeeUserId" label="用户id" align="center" width="160" v-if="show">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ffeeUserId" placeholder="用户id"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="feeTypeName" label="费用类型" align="center" width="160" >
        <template slot-scope="scope">
          <el-autocomplete
            :disabled="scope.row.status"
            class="inline-input"
            v-model="scope.row.feeTypeName"
            :fetch-suggestions="feeTypeSearch"
            placeholder="选择费用类型"
            @select="handleSelect"
          ></el-autocomplete>
        </template>
      </el-table-column>
      <el-table-column prop="ffeeName" label="费用名称" align="center" width="160">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ffeeName" placeholder="费用名" :readonly="scope.row.status"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ffeeMoney" label="费用金额" align="center" width="160">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ffeeMoney" placeholder="金额" :readonly="scope.row.status"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ffeeTime" label="费用日期" align="center" >
        <template slot-scope="scope">
          <el-date-picker
            :readonly="scope.row.status"
            v-model="scope.row.ffeeTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="费用日期"
            align="center"
            >
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column prop="ffeeRp" label="收/付" align="center" width="85">
        <template slot-scope="scope">
          <el-autocomplete
            :disabled="scope.row.status"
            class="inline-input"
            v-model="scope.row.ffeeRp"
            :fetch-suggestions="recOrPay"
            placeholder="收/付"
            @select="handleSelect2"
          ></el-autocomplete>
        </template>
      </el-table-column>
      <el-table-column prop="ffeeDetail" label="费用备注" align="center" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ffeeDetail" placeholder="费用备注" :readonly="scope.row.status"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleSave(scope.$index, scope.row)">保存</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    inject: ['reload'],
    data () {
      return {
        feeData: [],
        newValue: {
          ffeeId: '',
          ffeeType: '',
          ffeeTypeId: '',
          ffeeUserId: this.$cookies.get('USER_ID'),
          ffeeName: '',
          ffeeMoney: '',
          ffeeTime: '',
          ffeeDetail: '',
          feeTypeName: '',
          ffeeRp: '',
          status:'',
        },
        feeType: [],
        show: false,
        ffeeTypeId: '',
        isEdit: false,
        isAdd: false,
        feeRecOrPay: [
          {'value' : '收','key' : '1'},{'value' : "付", 'key' : '2'}
        ],
        ffeeRecOrPayValue: '',
        searchCondition:{
          ffeeTypeId:'',
          ffeeRp:'' ,
          ffeeBeginTime: '',
          ffeeEndTime: '',
          ffeeUserId: this.$cookies.get('USER_ID'),
          ffeeTypeName:'',
        },
        options: [{
          value: '1',
          label: '收'
        },{
          value: '2',
          label: '付'
        }]
      }
    },

    //方法区
    methods: {
      addLine () { //添加行数
        //添加新的行数
        this.newValue.status=false
        this.isAdd = true
        this.feeData.push(this.newValue);

      },

      //TODO 没搞懂
      feeTypeSearch (queryString, cb) {
        // console.log(queryString)
        // console.log(cb)
        var feeType = this.feeType;
        var results = queryString ? feeType.filter(this.createFilter(queryString)) : feeType;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      //TODO 没搞懂
      recOrPay(queryString, cb){
        var feeRecOrPay = this.feeRecOrPay;
        var results = queryString ? feeRecOrPay.filter(this.createFilter2(queryString)) : feeRecOrPay;
        cb(results);
      },
      createFilter (queryString) {
        return (feeType) => {
          return (feeType.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      createFilter2 (queryString) {
        return (feeType) => {
          return (feeType.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //加载费用类型
      loadAll () {
        var token = this.$cookies.get('USER_TOKEN');
        axios.post('/api/queryAllFeeType').then((response) => {
          if (token == null) {
            this.$alert('暂无权限，其重新登陆', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.href = response.request.responseURL;
              }
            })
          } else {
            if (response.data.code == 200) {
              this.feeType = [];
              for(let item of response.data.data){
                this.feeType.push({"value": item.feeTypeName,"id": item.feeTypeId})
              }
            }
          }
        });
      },

      //给ffeeTypeId赋值
      handleSelect(item){
        this.ffeeTypeId = item.id;
        this.searchCondition.ffeeTypeId = item.id;
      },

      handleSelect2(item){
        this.ffeeRecOrPayValue = item.key;
      },

      //保存费用
      handleSave(index, row){
        if(this.isAdd){
          row.ffeeTypeId = this.ffeeTypeId
          row.ffeeRp = this.ffeeRecOrPayValue
        }
        if(row.ffeeRp == '收'){
          row.ffeeRp = '1'
        }else {
          row.ffeeRp = '2'
        }
        var token = this.$cookies.get('USER_TOKEN');
        axios.post('/api/addOrEditFee',row).then((response) => {
          if (token == null) {
            this.$alert('暂无权限，其重新登陆', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.href = response.request.responseURL;
              }
            })
          } else {
            if (response.data.code == 200) {
              console.log(response)
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              this.reload();
            }else{
              this.$message.error('错了哦:' + response.data.data.msg);
            }
          }
        });
      },

      //修改费用
      handleEdit(index, row){
        this.feeData[index].status = false
        this.isEdit = true
      },

      //删除费用
      handleDelete(index, row){
        this.feeType = this.loadAll();
        var token = this.$cookies.get('USER_TOKEN');
        this.$confirm('确认删除这条费用吗！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:'warning',
        }).then(() =>{
          axios.post('/api/delFee',row.ffeeId,{
            headers: {
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
            }else{
              if (response.data.code == 200) {
                this.$message.success('删除成功');
                this.reload();
              }else{
                this.$message.error('删除失败');
              }
            }
          }).catch(() =>{
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
        })
      },

      //根据条件查询费用
      queryByCondition(){
        this.feeType = this.loadAll();
        var token = this.$cookies.get('USER_TOKEN');
        axios.post('/api/allFee',this.searchCondition,{
          headers: {
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
          } else {
            if (response.data.code == 200) {
              console.log(response.data.data)
              this.feeData = response.data.data;
              for(var i=0; i<this.feeData.length; i++){
                if(this.feeData[i].ffeeRp == '1'){
                  this.feeData[i].ffeeRp = '收'
                }else{
                  this.feeData[i].ffeeRp = '付'
                }
              }
            }else{
              this.$message.error('错了哦:' + response.data.data.msg);
            }
          }
        });
      }
    },
    mounted() {
      this.queryByCondition();
    }
  }
</script>

<style scoped>

</style>
