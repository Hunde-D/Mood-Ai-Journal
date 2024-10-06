'use client'

import * as React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  BookIcon,
} from '@radix-ui/react-icons'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { getEntries } from '@/utils/api'

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const [journals, setJournals] = React.useState([])
  const [query, setQuery] = React.useState('')

  React.useEffect(() => {
    const fetchJournals = async () => {
      const entries = await getEntries()
      setJournals(entries)
    }

    fetchJournals()
  }, [query])

  const filteredJournals = React.useMemo(() => {
    return journals.filter((journal) =>
      journal.analysis.subject.toLowerCase().includes(query.toLowerCase()),
    )
  }, [journals, query])

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

  const handleQuery = (value: string) => {
    setQuery(value)
  }

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
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={handleQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {/* <CommandGroup heading="Suggestions"> */}
          {filteredJournals.map((journal) => (
            <CommandItem key={journal.id}>
              <BookIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
          ))}
          {/* </CommandGroup> */}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
