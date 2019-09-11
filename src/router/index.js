import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index'
import personCenter from '../components/index/personCenter'
import FeeType from '../components/fee/FeeType'
import FeeTypeTable from '../components/fee/FeeTypeTable'
import MyFee from '../components/fee/MyFee'
import FeeCharts from '../components/fee/FeeCharts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/personCenter',
      name: 'personCenter',
      component: personCenter,
      children: [
        {
          path: '/feeType',
          name: 'feeType',
          component: FeeType,
          children: [
            {
              path: '/feeTypeTable',
              name: 'feeTypeTable',
              component: FeeTypeTable,
            }
          ]
        },
        {
          path:'/MyFee',
          name: 'MyFee',
          component: MyFee
        },
        {
          path: '/FeeCharts',
          name: 'FeeCharts',
          component: FeeCharts
        }
      ]
    }
  ]
})
