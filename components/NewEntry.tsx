'use client'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { createNewEntry } from '@/utils/api'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
const NewEntry = () => {
  const router = useRouter()

  const handleClick = async () => {
    const NewEntry = await createNewEntry()
    router.push(`/journal/${NewEntry.id}`)
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className="flex h-10 w-fit cursor-pointer items-center justify-between gap-10 px-5 hover:bg-gray-100 dark:hover:bg-white/20"
            onClick={handleClick}
          >
            <CardHeader className="p-0">
              <CardTitle>New Journal</CardTitle>
            </CardHeader>
            <div>
              <Plus size={20} />
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add New Journal</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default NewEntry
