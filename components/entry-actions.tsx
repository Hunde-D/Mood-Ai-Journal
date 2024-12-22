'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle, MoreVertical, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteEntry } from '@/utils/action'
import { toast } from 'sonner'

export function EntryActions({ entryId }: { entryId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDeleteEntry = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsDeleting(true)
    try {
      await deleteEntry(entryId)
      toast.success('Entry deleted successfully')
      setIsDeleting(false)
      router.refresh()
    } catch (error) {
      console.error('Error deleting entry:', error)
      setIsDeleting(false)
      toast.error('Failed to delete entry')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 data-[state=open]:bg-accent"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={(e) => handleDeleteEntry(e)}
          disabled={isDeleting}
          className="flex items-center text-destructive focus:text-destructive"
        >
          {isDeleting ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}
          Delete Entry
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
