'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useEventListener } from 'usehooks-ts'
import Chat from './chat'

export function ChatDialog() {
  const [open, setOpen] = React.useState(false)
  // const [result, setResult] = React.useState(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((open) => !open)
    }
  })

  return (
    <>
      <div
        className="relative flex items-center"
        onClick={() => setOpen((open) => !open)}
      >
        <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Ask AI anything..."
          className="w-72 appearance-none bg-background px-8 shadow-none"
        />
        <div className="absolute right-2.5 text-sm text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-5">
          <Chat />
        </DialogContent>
      </Dialog>
    </>
  )
}
