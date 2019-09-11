<template>
    <div>
      <el-button type="primary" @click="login">主要按钮</el-button>
<!--      <router-link to="/personCenter">aa</router-link>-->
    </div>
</template>

<script>
  import axios from 'axios'
export default {
  data () {
    return {}
  },
  methods: {
    login(){
      axios.get('/api/login').then((response) => {
        //alert(response.data.code)
        console.log(response)
        if(response.status == 200){
          if(response.data.code == 202){
            window.location.href="http://localhost:8888/personCenter"
          }else{
            window.location.href=response.request.responseURL
          }
        }
      })
    }

  }
}
</script>

<style scoped>

</style>
