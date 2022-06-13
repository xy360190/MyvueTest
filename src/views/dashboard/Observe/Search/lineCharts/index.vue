<template>
<div>
    <div class="header">
        <span class="search-header">搜索用户数</span>
           <svg width="14" height="14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z" fill="#333"/><path d="M24.5 34V20H23.5H22.5" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 34H28" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>

    </div>
    <div class="main"> 
        <span class="main-title">12312</span>
        <span class="main-content">17.1</span>
               <svg width="24" height="14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M40.9999 27.0007L40.9999 15.0007L29 15.0007" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 37.0002L16.3385 24.5002L26.1846 30.5002L41 15.0002" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                   <svg width="24" height="14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M29 34.9999L41 34.9999L41 23" stroke="#d0021b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 13L16.3385 25.5L26.1846 19.5L41 35" stroke="#d0021b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>

    </div>
    <div class="footer" >
        <div class="charts" ref="charts"></div>
    </div>
</div>
</template>
<script>
import * as echarts from "echarts";

export default {
  name: "",
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      // 系列
      series: [
        {
          type: "line",
          //   smooth:true,
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          // 拐点样式的设置
          itemStyle: {
            opacity: 0,
          },
          // 线条样式
          lineStyle: {
            color: "blue",
          },
          // 填充颜色设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              golbal: false,
            },
          },
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
}
.search-header {
  margin-right: 20px;
}
.main {
  margin: 10px 0px;
}
.main-title {
  margin-right: 30px;
}
.main-content {
  margin-right: 10px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>