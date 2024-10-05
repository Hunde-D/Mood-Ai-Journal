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
const Editor = ({ entry }) => {
  const [content, setContent] = useState(entry.content)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const [analysisLoading, setAnalysisLoading] = useState(false)

  const handleNewAnalysis = async () => {
    try {
      setAnalysisLoading(true)
      const data = await updateAnalysis(entry.id, content)
      setAnalysis(data)
      setAnalysisLoading(false)
    } catch (error) {
      console.log('handleError:', error)
    }
  }

  useAutosave({
    data: content,
    onSave: async (data) => {
      // Use the updateEntry promise directly in toast.promise
      toast.promise(
        updateEntry(entry.id, data), // Pass the updateEntry promise
        {
          loading: 'Saving...',
          success: () => `Journal is Updated ! `,
          error: 'Error saving data',
        },
      )
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
      <ResizablePanel defaultSize={75} className="px-3 py-1">
        <Textarea
          className="h-full w-full resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} className="flex flex-col gap-5 pl-5">
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
