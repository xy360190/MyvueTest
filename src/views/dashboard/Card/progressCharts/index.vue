<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
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
        // 最大值跟最小值设置
        min:0,
        max:100
       
      },
      yAxis: {
        show: false,
         // 均分
        type: "category",
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [78],
          color:"cyan",
          // 柱体宽度
            barWidth:10,
            color:"yellowgreen", 
            // 背景颜色设置
            showBackground:true,
            // 设备背景颜色
            backgroundStyle:{
                color:'#eee',

            },
            // 文本标签
            label:{
                show:true,
                formatter:'|',
                position:'right'
            }

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
.charts {
  width: 100%;
  height: 100%;
}
</style>
