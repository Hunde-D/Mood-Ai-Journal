'use client'
import { useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { updateAnalysis } from '@/utils/api'
import { Textarea } from './ui/textarea'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'
import { Button } from './ui/button'
import { LoaderCircle } from 'lucide-react'
import { formatTime } from '@/utils/formatDate'
import { toast } from 'sonner'
import MobileAnalysisView from './MobileAnalysisView'
const Editor = ({ entry }) => {
  const [content, setContent] = useState(entry.content)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const [analysisLoading, setAnalysisLoading] = useState(false)

  const handleNewAnalysis = async () => {
    const promise = async () => {
      setAnalysisLoading(true)
      const data = await updateAnalysis(entry.id, content)

      if (!data) {
        setAnalysisLoading(false)
        throw new Error(
          'GoogleGenerativeAIError: Too Many Requests, Resource has been exhausted. Check quota',
        )
      }
      setAnalysis(data)
      setAnalysisLoading(false)
      return data
    }

    toast.promise(promise(), {
      loading: 'Updating analysis...',
      success: (data) => `You look ${data.mood} ${data.emoji}`,
      error: (error) => `${error}`, // This is displayed if the promise is rejected
    })
  }

  useAutosave({
    data: content,
    onSave: async (data) => {
      await updateEntry(entry.id, data)
    },
  })

  const analysisData = [
    { name: 'Mood', value: 'mood' },
    { name: 'Subject', value: 'subject' },
    { name: 'summary', value: 'summary' },
    { name: 'Emotion', value: 'emotion' },
    { name: 'Sentiment Score', value: 'sentimentScore' },
  ]
  function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `${r}, ${g}, ${b}`
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel
        defaultSize={75}
        className="px-3 py-1 max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:pl-2 max-sm:pr-8"
      >
        <Textarea
          className="h-full w-full resize-none max-sm:hidden"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex h-full flex-col gap-5 sm:hidden">
          <Textarea
            className="h-4/5 w-full resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <MobileAnalysisView
            analysis={analysis}
            analysisData={analysisData}
            analysisLoading={analysisLoading}
            handleNewAnalysis={handleNewAnalysis}
            hexToRGB={hexToRGB}
          >
            <Button className="w-full">Open Analyzer</Button>
          </MobileAnalysisView>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={25}
        className="flex flex-col gap-5 pl-5 max-md:hidden"
      >
        <div className="flex h-fit items-center justify-between px-5">
          <div>
            <h3 className="text-lg font-semibold">AI Analysis</h3>
            <p className="text-xs text-muted-foreground">
              last analyzed {formatTime(analysis.updatedAt)}
            </p>
          </div>
        </div>
        <div
          className="moodBackground h-16 w-full rounded-xl"
          style={{ backgroundColor: `rgba(${hexToRGB(analysis.color)}, 0.7)` }}
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
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
export default Editor
