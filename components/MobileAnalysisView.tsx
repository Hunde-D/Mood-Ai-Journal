'use client'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { formatTime } from '@/utils/formatDate'
import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
const MobileAnalysisView = ({
  children,
  analysis,
  analysisLoading,
  analysisData,
  handleNewAnalysis,
  hexToRGB,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-10">
        <div className="flex h-fit items-center justify-between px-5">
          <div>
            <h3 className="text-lg font-semibold">AI Analysis</h3>
            <p className="text-xs text-muted-foreground">
              last analyzed {formatTime(analysis.updatedAt)}
            </p>
          </div>
        </div>
        <div
          className="moodBackground h-24 w-full rounded-xl"
          style={{
            backgroundColor: `rgba(${hexToRGB(analysis.color)}, 0.7)`,
          }}
        ></div>
        <div className="divide-y">
          {analysisData.map((item) => (
            <div key={item.name} className="flex h-fit w-full gap-2 py-4">
              <div className="w-20 min-w-20">
                <p className="text-sm font-semibold">{item.name}</p>
              </div>
              <p className="line-clamp-3 text-pretty text-xs text-muted-foreground hover:line-clamp-none">
                {item.value === 'mood' && analysis.emoji}{' '}
                {analysis?.[item.value]}
              </p>
            </div>
          ))}
        </div>
        {analysisLoading ? (
          <Button className="w-full" disabled>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Analyzing
          </Button>
        ) : (
          <Button onClick={handleNewAnalysis} className="w-full">
            Analyze
          </Button>
        )}
      </SheetContent>
    </Sheet>
  )
}
export default MobileAnalysisView
