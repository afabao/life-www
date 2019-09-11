<template>
  <div>
    <div>
      <el-button type="primary" @click="openFeeTypeAddForm = true">添加费用类型</el-button>
      <el-dialog title="新建费用类型" :visible.sync="openFeeTypeAddForm">
        <el-form :model="form">
          <el-form-item label="费用名称" :label-width="formLabelWidth">
            <el-input v-model="form.feeTypeName" auto-complete="off" placeholder="请输入费用名称"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="2" v-model="form.feeDescribe" auto-complete="off" placeholder="请输入费用类型描述"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openFeeTypeAddForm = false">取 消</el-button>
          <el-button type="primary" @click="addFeeType">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <feeTypeTable :tableData='tableData'></feeTypeTable>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import feeTypeTable from './FeeTypeTable'
  export default {
    inject: ['reload'],
    data() {
      return{
        form: {
          feeTypeName: '',
          feeDescribe: '',
        },
        openFeeTypeAddForm: false,
        formLabelWidth: '120px',
        tableData:''
      }
    },
    methods: {
      addFeeType(){
        var token = this.$cookies.get('USER_TOKEN');
        var form = this.form
        console.log(form);
        console.log(token);
        axios.post('/api/addFeeType',form).then((response) => {
          if(token == null){
            this.$alert('暂无权限，其重新登陆','提示',{
              confirmButtonText: '确定',
              callback: action => {
                window.location.href=response.request.responseURL;
              }
            })
          }else{
            console.log(response)
            if(response.data.code == 200){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.openFeeTypeAddForm = false;
              this.reload();
            }else{
              this.$message({
                message: response.data.msg,
                type: 'warning'
              });
            }
          }
        }).catch((response) => {
          console.log(response)
          this.$alert(response,'提示',{
            confirmButtonText: '确定',
            message: response,
            type: 'error',
            callback: action => {
              this.openFeeTypeAddForm = false;
            }
          })
        })
      },
      queryAllFeeType(){
        var token = this.$cookies.get('USER_TOKEN');
        console.log(token)
        axios.post('/api/queryAllFeeType').then((response) => {
          if(token == null){
            this.$alert('暂无权限，其重新登陆','提示',{
              confirmButtonText: '确定',
              callback: action => {
                window.location.href=response.request.responseURL;
              }
            })
          }else{
            if(response.data.code == 200){
              this.tableData = response.data.data;
            }
          }
        })
      },
    },
    mounted: function(){
      this.queryAllFeeType();
    },

    components: {
      'feeTypeTable': feeTypeTable,
    }
  }
</script>

<style scoped>

</style>
