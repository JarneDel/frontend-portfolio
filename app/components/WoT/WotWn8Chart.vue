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

const getWn8Color = (wn8: number) => {
  if (wn8 < 300) return '#930d0d' // Very Bad
  if (wn8 < 600) return '#cd3333' // Bad
  if (wn8 < 900) return '#cc7a00' // Below Average
  if (wn8 < 1250) return '#ccb800' // Average
  if (wn8 < 1600) return '#849b24' // Good
  if (wn8 < 1900) return '#4c762e' // Very Good
  if (wn8 < 2350) return '#4a92b7' // Great
  if (wn8 < 2900) return '#83579d' // Unicum
  return '#5a3175' // Super Unicum
}

const chartData = computed<ChartData<'line'>>(() => {
  const wn8Data = props.data.map(d => d.wn8)

  // Calculate Trendline
  const n = wn8Data.length
  let trendlineData: number[] = []

  if (n > 1) {
    const indices = Array.from({ length: n }, (_, i) => i)
    const sumX = indices.reduce((a, b) => a + b, 0)
    const sumY = wn8Data.reduce((a, b) => a + b, 0)
    const sumXY = indices.reduce((a, i) => a + i * (wn8Data[i] ?? 0), 0)
    const sumXX = indices.reduce((a, i) => a + i * i, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    trendlineData = indices.map(i => slope * i + intercept)
  }

  const referenceLine = (value: number) => Array(n).fill(value)

  return {
    labels: props.data.map(d => d.date),
    datasets: [
      {
        label: 'WNX',
        data: wn8Data,
        borderColor: '#2dd4bf', // Tailwind primary-dark
        borderWidth: 2,
        tension: 0.4, // Smooth curves
        pointBackgroundColor: (ctx: any) => getWn8Color(ctx.raw as number),
        pointBorderColor: (ctx: any) => getWn8Color(ctx.raw as number),
        pointBorderWidth: 1,
        pointRadius: (ctx: any) => {
          const battles = props.data[ctx.dataIndex]?.battles || 0
          // Scale: min 3, max 8 based on battles. Cap at ~32 battles for max size.
          return Math.min(Math.max(battles / 4, 3), 8)
        },
        pointHoverRadius: (ctx: any) => {
           const battles = props.data[ctx.dataIndex]?.battles || 0
           return Math.min(Math.max(battles / 4, 3), 8) + 2
        },
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return 'rgba(45, 212, 191, 0.3)'
          return getGradient(ctx, chartArea)
        },
      },
      {
        label: 'Trend',
        data: trendlineData,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
        tension: 0
      },
      // Reference Lines
      {
        label: 'Good',
        data: referenceLine(1250),
        borderColor: 'rgba(132, 155, 36, 0.3)',
        borderWidth: 1,
        borderDash: [2, 2],
        pointRadius: 0,
        fill: false
      },
      {
        label: 'Great',
        data: referenceLine(1900), // Using 1900 for Great/Blue start
        borderColor: 'rgba(74, 146, 183, 0.3)',
        borderWidth: 1,
        borderDash: [2, 2],
        pointRadius: 0,
        fill: false
      },
      {
        label: 'Unicum',
        data: referenceLine(2350),
        borderColor: 'rgba(131, 87, 157, 0.3)',
        borderWidth: 1,
        borderDash: [2, 2],
        pointRadius: 0,
        fill: false
      }
    ]
  }
})
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
        label: (ctx) => {
          const yVal = ctx.parsed.y
          if (yVal === null) return ''
          if (ctx.dataset.label === 'Trend') return `Trend: ${yVal.toFixed(0)}`
          return `WNX: ${yVal}`
        },
        // Add extra info to tooltip if needed
        afterLabel: (ctx) => {
          if (ctx.datasetIndex === 0) {
            const battles = props.data[ctx.dataIndex]?.battles
            return `${battles} Battles`
          }
          return ''
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
      beginAtZero: true, // Focus on the range
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