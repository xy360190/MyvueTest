<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥129560">
              <template slot="charts">
                  
                  <span>周同比&nbsp;&nbsp;56.67% <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M40.9999 27.0007L40.9999 15.0007L29 15.0007" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 37.0002L16.3385 24.5002L26.1846 30.5002L41 15.0002" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                  &nbsp;&nbsp;
                  <span>日同比&nbsp;&nbsp;19.96% <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M29 34.9999L41 34.9999L41 23" stroke="#d0021b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 13L16.3385 25.5L26.1846 19.5L41 35" stroke="#d0021b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              </template>
              <template slot="footer">
                  <span>日销售额￥ 12423</span>
              </template>
          </Detail>
        </el-card>
      </el-col>
      <!-- 第二个card -->
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
              <template slot="charts">
                  <lineCharts></lineCharts>
              </template>
               <template slot="footer">
                  <span>日访问量 1234</span>
              </template>
          </Detail> </el-card
      ></el-col>
      <el-col :span="6">
        <el-card>
            <!-- 第三个 -->
          <Detail title="支付笔数" count="88460">
              <template slot="charts">
                  <barCharts></barCharts>
              </template>
               <template slot="footer">
                  <span>日转化率 65%</span>
              </template>
          </Detail> </el-card
      ></el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
              <template slot="charts">
                  <progressCharts></progressCharts>
              </template>
                <template slot="footer">
                  <span>周同比&nbsp;&nbsp;56.67% <svg width="24" height="14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M40.9999 27.0007L40.9999 15.0007L29 15.0007" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 37.0002L16.3385 24.5002L26.1846 30.5002L41 15.0002" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                  &nbsp;&nbsp;
                  <span>日同比&nbsp;&nbsp;19.96% <svg width="24" height="14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M29 34.9999L41 34.9999L41 23" stroke="#d0021b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 13L16.3385 25.5L26.1846 19.5L41 35" stroke="#d0021b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              </template>
          </Detail> </el-card
      ></el-col>
    </el-row>
  </div>
</template>
<script>
import Detail from "./Detail";
import lineCharts from './lineChart';
import barCharts from './barCharts';
import progressCharts from './progressCharts'
export default {
  name: "",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts
},
};
</script>



        <style>
</style>