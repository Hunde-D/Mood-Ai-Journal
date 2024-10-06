'use client'

import * as React from 'react'
import { Input } from './ui/input'
import { Search, Book } from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [journals, setJournals] = React.useState([])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

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

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Ask about your journals" />
        <CommandList>
          <CommandEmpty>coming soon..</CommandEmpty>
          {journals.map((journal) => (
            <CommandItem key={journal.id}>
              <Book className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
          ))}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
