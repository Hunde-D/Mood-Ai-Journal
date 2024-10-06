import { getAnalytics } from '@/utils/action'
import Chart from '@/components/Chart'
import { ChartConfig } from '@/components/ui/chart'

const page = async () => {
  const analytics = await getAnalytics()
  const avg =
    analytics.reduce((acc, data) => acc + data.sentimentScore, 0) /
    analytics.length
  const chartData = analytics.map((data) => {
    return {
      mood: data.mood,
      sentimentScore: data.sentimentScore,
      fill: data.color,
    }
  })
  const chartConfig = chartData.reduce((config, item) => {
    const formattedMood = item.mood.replace(/\s+/g, '') // Remove all spaces
    config[formattedMood] = {
      label: formattedMood.charAt(0).toUpperCase() + formattedMood.slice(1), // Capitalize the first letter
      color: item.fill, // Use 'fill' as color in the config
    }
    return config
  }, {} satisfies ChartConfig)

  console.log(chartData, analytics)
  return <Chart avg={avg} chartData={chartData} chartConfig={chartConfig} />
}
export default page
