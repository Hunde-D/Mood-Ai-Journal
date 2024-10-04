import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'
import { getEntries } from '@/utils/action'
import { ScrollArea } from '@/components/ui/scroll-area'

const Page = async () => {
  const entries = await getEntries()

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <h2 className="text-3xl">Journals</h2>
      <NewEntry />
      <ScrollArea className="h-[200px] w-full flex-auto">
        <div className="flex flex-wrap gap-5 pb-3">
          <EntryCard entries={entries} />
        </div>
      </ScrollArea>
    </div>
  )
}

export default Page
