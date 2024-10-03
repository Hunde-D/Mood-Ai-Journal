'use client'
import { useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Textarea } from './ui/textarea'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'
const Editor = ({ entry }) => {
  const [content, setContent] = useState(entry.content)

  useAutosave({
    data: content,
    onSave: async (data) => {
      await updateEntry(entry.id, data)
    },
  })
  const analysis = [
    {
      name: 'Summery',
      value:
        ' Check out my other projects and see what else I have to offer! Check out my other projects and see what else I have to offer!',
    },
    {
      name: 'Subject',
      value:
        'Check out my other projects and seeCheck out my other projects and see what else I have to offer!Check out my other projects and see what else I have to offer!',
    },
    { name: 'Mood', value: 'happy day papy' },
    { name: 'Emotion', value: 'positive' },
  ]

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel defaultSize={75} className="px-3 py-1">
        <Textarea
          className="h-full w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} className="flex flex-col gap-10 pl-5">
        <div className="flex h-8 items-center justify-between px-5">
          <h3 className="text-lg font-semibold">AI Analysis</h3>
        </div>
        <div className="divide-y">
          {analysis.map((item) => (
            <div key={item.name} className="flex h-fit w-full gap-2 py-4">
              <div className="w-16 min-w-16">
                <p className="text-sm font-semibold">{item.name}</p>
              </div>
              <p className="line-clamp-3 text-pretty text-xs text-muted-foreground hover:line-clamp-none">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
export default Editor
