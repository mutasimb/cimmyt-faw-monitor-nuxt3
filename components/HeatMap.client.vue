<script setup>
import { storeToRefs } from 'pinia'

import { use } from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  VisualMapComponent
} from 'echarts/components'
import { HeatmapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

import { timeFormat } from 'd3-time-format'

use([
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer
])


const
  storeMonitorProgress = useMonitorProgressStore(),
  { seasonSelectedData } = storeToRefs(storeMonitorProgress),

  sizeBlock = ref(30),
  sizeL = ref(350),
  sizeT = ref(150),
  sizeW = computed(() => sizeBlock.value * (seasonSelectedData.value?.x.length || 0)),
  sizeH = computed(() => sizeBlock.value * (seasonSelectedData.value?.y.length || 0)),

  chartOptions = computed(() => ({
    tooltip: {
      position: 'top',
      valueFormatter: val => val === 0 ? 'No activity'
        : val === 1 ? 'Trap Installation'
          : val === 2 ? 'Scouting'
            : 'No activity'
    },
    grid: {
      left: sizeL.value,
      top: sizeT.value,
      width: sizeW.value,
      height: sizeH.value,
    },
    xAxis: {
      type: 'category',
      position: 'top',
      data: seasonSelectedData.value.x.map(d => new Date(d)).map(d => timeFormat('%B %-d, %Y')(d)),
      splitArea: { show: true, },
      axisLabel: { rotate: -45 },
    },
    yAxis: {
      type: 'category',
      data: seasonSelectedData.value.y.map(
        d => `${d.name}${d.adm && d.adm.adm2 && d.adm.adm3 ? ` | ${d.adm.adm3}, ${d.adm.adm2}` : ''} | Trap ${d.tag}`
      ),
      splitArea: { show: true, }
    },
    visualMap: {
      type: 'piecewise',
      splitNumber: 3,
      pieces: [
        { value: 0, label: 'No activity' },
        { value: 1, label: 'Trap Installation' },
        { value: 2, label: 'Scouting' }
      ],
      categories: [0, 1, 2],
      color: ['#7570b3', '#1b9e77', 'transparent'],
      show: false
    },
    series: [
      {
        name: 'Scouting Progress',
        type: 'heatmap',
        data: seasonSelectedData.value.dataViz.map(d => [d.x, d.y, d.val]),
        emphasis: {
          itemStyle: {
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }))
</script>

<template>
  <VChart v-if="seasonSelectedData" :key="seasonSelectedData" :option="chartOptions" :style="{
    width: '100%',
    height: `${sizeH + sizeT}px`,
    margin: '0 auto'
  }" />
</template>
