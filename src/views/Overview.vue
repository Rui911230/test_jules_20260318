<template>
  <div class="dashboard-container">
    <h2>今日概览</h2>

    <!-- 关键指标卡片 -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-content">
            <div class="stat-title">今日识别总数</div>
            <div class="stat-value">{{ dashboardData.todayTotal }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-content">
            <div class="stat-title">识别成功率 (%)</div>
            <div class="stat-value success">{{ dashboardData.successRate }}%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-content">
            <div class="stat-title">活跃用户数</div>
            <div class="stat-value">{{ dashboardData.activeUsers }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-content">
            <div class="stat-title">待人工复核</div>
            <div class="stat-value warning">{{ dashboardData.pendingReviews }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="charts-row">
      <!-- 最近7天识别趋势折线图 -->
      <el-col :span="14">
        <el-card shadow="hover">
          <h3>最近7天食物识别趋势</h3>
          <div ref="trendChartRef" class="chart"></div>
        </el-card>
      </el-col>

      <!-- 食物类别识别占比饼图 -->
      <el-col :span="10">
        <el-card shadow="hover">
          <h3>不同食物类别识别占比</h3>
          <div ref="categoryChartRef" class="chart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import { getDashboardData, getTrendData, getCategoryData } from '../api/dashboard';

const dashboardData = ref({
  todayTotal: 0,
  successRate: 0,
  activeUsers: 0,
  pendingReviews: 0,
});

const trendChartRef = ref<HTMLDivElement | null>(null);
const categoryChartRef = ref<HTMLDivElement | null>(null);

let trendChart: echarts.ECharts | null = null;
let categoryChart: echarts.ECharts | null = null;

const initTrendChart = async () => {
  if (!trendChartRef.value) return;
  trendChart = echarts.init(trendChartRef.value);
  const data = await getTrendData();

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: data.dates
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data.counts,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(58,119,255,0.5)' },
            { offset: 1, color: 'rgba(58,119,255,0.1)' }
          ])
        },
        itemStyle: {
          color: '#3a77ff'
        }
      }
    ]
  };
  trendChart.setOption(option);
};

const initCategoryChart = async () => {
  if (!categoryChartRef.value) return;
  categoryChart = echarts.init(categoryChartRef.value);
  const data = await getCategoryData();

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      bottom: '5%',
      left: 'center'
    },
    series: [
      {
        name: '食物类别',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };
  categoryChart.setOption(option);
};

const fetchData = async () => {
  dashboardData.value = await getDashboardData();
  await initTrendChart();
  await initCategoryChart();
};

const resizeCharts = () => {
  trendChart?.resize();
  categoryChart?.resize();
};

onMounted(() => {
  fetchData();
  window.addEventListener('resize', resizeCharts);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts);
  trendChart?.dispose();
  categoryChart?.dispose();
});
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}
.stat-cards {
  margin-bottom: 20px;
}
.stat-content {
  text-align: center;
  padding: 10px 0;
}
.stat-title {
  color: #606266;
  font-size: 14px;
  margin-bottom: 10px;
}
.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}
.stat-value.success {
  color: #67c23a;
}
.stat-value.warning {
  color: #e6a23c;
}
.charts-row {
  margin-top: 20px;
}
.chart {
  height: 350px;
  width: 100%;
}
</style>
