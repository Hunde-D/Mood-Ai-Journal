'use client'

import { CartesianGrid, Dot, Line, LineChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A line chart For user journal mood sentiment score'

export default function Chart({
  chartData,
  chartConfig,
  avg,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartData: any
  chartConfig: ChartConfig
  avg: number
}) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Line Chart - Semantic Score</CardTitle>
        <CardDescription>
          <span className="mr-1 text-primary">Semantic score scale</span>
          -10 to 10, with 0 being neutral
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[400px] w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 50,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="mood"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="sentimentScore"
              type="natural"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.sentimentScore}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.fill}
                    stroke={payload.fill}
                  />
                )
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Average Semantic score of your journals - {avg}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing mood and semantic score of ur journal entries
        </div>
      </CardFooter>
    </Card>
  )
}
