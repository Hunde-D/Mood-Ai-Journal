'use client'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { createNewEntry } from '@/utils/api'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
const NewEntry = () => {
  const router = useRouter()

  const handleClick = async () => {
    const newEntry = await createNewEntry()
    router.push(`/journal/${newEntry.id}`)
  }
  return (
    <Card
      className="flex h-32 w-fit cursor-pointer items-center justify-between gap-10 px-5 text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/20"
      onClick={handleClick}
    >
      <CardHeader className="p-0">
        <CardTitle>Create New Journal</CardTitle>
      </CardHeader>
      <div>
        <Plus size={20} />
      </div>
    </Card>
  )
}
export default NewEntry
