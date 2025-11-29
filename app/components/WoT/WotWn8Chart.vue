<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  type ChartOptions,
  type ChartData
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

const props = defineProps<{
  data: { date: string; wn8: number; battles: number }[]
}>()

// Gradient Function
const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
  // Teal gradient fading to transparent
  gradient.addColorStop(0, 'rgba(45, 212, 191, 0.0)') // Transparent at bottom
  gradient.addColorStop(1, 'rgba(45, 212, 191, 0.3)') // Primary color at top
  return gradient
}

const chartData = computed<ChartData<'line'>>(() => ({
  labels: props.data.map(d => d.date),
  datasets: [
    {
      label: 'WN8',
      data: props.data.map(d => d.wn8),
      borderColor: '#2dd4bf', // Tailwind primary-dark
      borderWidth: 2,
      tension: 0.4, // Smooth curves
      pointBackgroundColor: '#151314', // bg-dark-200
      pointBorderColor: '#2dd4bf',
      pointBorderWidth: 2,
      pointRadius: 0, // Hide points by default
      pointHoverRadius: 6, // Show on hover
      fill: true,
      backgroundColor: (context: any) => {
        const chart = context.chart
        const { ctx, chartArea } = chart
        if (!chartArea) return 'rgba(45, 212, 191, 0.3)'
        return getGradient(ctx, chartArea)
      },
    }
  ]
}))
const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: '#211f22', // bg-dark-300
      titleColor: '#fff',
      bodyColor: '#d4d3ce',
      borderColor: '#384047',
      borderWidth: 1,
      displayColors: false,
      callbacks: {
        label: (ctx) => `WN8: ${ctx.parsed.y}`,
        // Add extra info to tooltip if needed
        afterLabel: (ctx) => {
          const battles = props.data[ctx.dataIndex]?.battles
          return `${battles} Battles`
        }
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { 
        color: '#6b7280', 
        font: { size: 10 },
        maxTicksLimit: 8 // Don't crowd x-axis
      }
    },
    y: {
      grid: { color: '#2b2c31' }, // subtle grid lines
      ticks: { color: '#6b7280', font: { size: 10 } },
      beginAtZero: false, // Focus on the range
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  }
}
</script>

<template>
  <div class="w-full h-full relative">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>