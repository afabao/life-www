<template>
  <el-table
    :data=tableData
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="feeTypeId"
      label="id"
      width="150"
      v-if="show"
      v-loading="loading">
    </el-table-column>
    <el-table-column
      fixed
      prop="feeTypeName"
      label="费用名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="creator"
      label="创建人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="modifyTime"
      label="修改时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="modifier"
      label="修改人"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="feeDescribe"
      label="描述"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="editFeeTypeUI(scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small" @click="deleteFeeType(scope.row)">删除</el-button>
      </template>
    </el-table-column>
      <el-dialog title="编辑费用类型" :visible.sync="openFeeTypeEditForm" :append-to-body="true">
        <el-form :model="formEdit">
          <el-form-item label="id" :label-width="formLabelWidth" v-if="show">
            <el-input v-model="formEdit.feeTypeId" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="费用名称" :label-width="formLabelWidth">
            <el-input v-model="formEdit.feeTypeName" auto-complete="off" placeholder="请输入费用名称"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="2" v-model="formEdit.feeDescribe" auto-complete="off" placeholder="请输入费用类型描述"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openFeeTypeEditForm = false">取 消</el-button>
          <el-button type="primary" @click="editFeeType">确 定</el-button>
        </div>
      </el-dialog>
  </el-table>
</template>
<script>
  import axios from 'axios'
  export default {
    inject: ['reload'],
    props: ['tableData'],
    data() {
      return{
        cData: [],
        multipleSelection: [],
        openFeeTypeEditForm: false,
        formLabelWidth: '120px',
        formEdit: {
          feeTypeName: '',
          feeDescribe: '',
          feeTypeId:''
        },
        show: false,
        loading: true
      }
    },
    watch :{
      tableData: function(newVal,oldVal){
        this.cData = newVal
        console.log(this.cData)
      }
    },
    methods:{
      //编辑数据页面
      editFeeTypeUI(row){
        var token = this.$cookies.get('USER_TOKEN');
        this.openFeeTypeEditForm = true;
        console.log(row.feeTypeId)
        axios.post('/api/getFeeTypeById',row.feeTypeId,{
          headers: {
            'Content-Type':'application/json;charset=UTF-8'
          }
        }).then((response) => {
          if(token == null){
            this.$alert('暂无权限，其重新登陆','提示',{
              confirmButtonText: '确定',
              callback: action => {
                window.location.href=response.request.responseURL;
              }
            });
          }else{
            if(response.data.code == 200){
              console.log(response)
              this.formEdit.feeTypeName = response.data.data.feeTypeName
              this.formEdit.describe = response.data.data.describe
              this.formEdit.feeTypeId = response.data.data.feeTypeId
              console.log(this.formEdit.feeTypeId)
            }else{
              this.$message({
                message: '获取信息失败',
                type: 'warning'
              });
            }
          }
        });
      },

      //编辑数据
      editFeeType(){
        var token = this.$cookies.get('USER_TOKEN');
        axios.post('/api/editFeeTypeById',this.formEdit,{
        }).then((response) => {
          if(token == null){
            this.$alert('暂无权限，其重新登陆','提示',{
              confirmButtonText: '确定',
              callback: action => {
                window.location.href=response.request.responseURL;
              }
            });
          }else{
            if(response.data.code == 200){
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: 2000
              });
              this.openFeeTypeEditForm = true;
              this.reload();
            }else{
              this.$message({
                message: '修改失败',
                type: 'warning',
                duration: 2000
              });
              this.openFeeTypeEditForm = true;
              this.reload();
            }
          }
        });
      },

      //删除数据
      deleteFeeType(row){
        var token = this.$cookies.get('USER_TOKEN');
        this.$alert('确认删除此条数据吗?','提示',{
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
            axios.post('/api/deleteFeeType',row.feeTypeId,{
              headers: {
                'Content-Type':'application/json;charset=UTF-8'
              }
            }).then((response) => {
              if(token == null){
                this.$alert('暂无权限，其重新登陆','提示',{
                  confirmButtonText: '确定',
                  callback: action => {
                    window.location.href=response.request.responseURL;
                  }
                });
              }else{
                if(response.data.code == 200){
                  this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.reload();
                }else{
                  this.$message({
                    message: '删除失败',
                    type: 'success',
                    duration: 2000
                  });
                }
              }
            });
          }
        });

      }
    }
  }
</script>

<style scoped>
  body{
    margin: 0;
  }
</style>
