'use client'
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SpotlightCard from '@/components/SpotlightCard'
import { formatTime } from '@/utils/formatDate'
import Link from 'next/link'
const EntryCard = ({ entries }) => {
  // const entryDate = useClientFormattedTime()

  return entries?.map((entry) => (
    <Link
      href={`/journal/${entry.id}`}
      key={entry.id}
      className="w-96 flex-auto md:w-80"
    >
      <SpotlightCard>
        <Card className="h-40 min-h-40 w-full cursor-pointer items-center justify-center">
          <CardHeader>
            <CardTitle>{entry.analysis.subject}</CardTitle>
            <CardDescription>
              last updated {formatTime(entry.updatedAt)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-start">
            <p className="line-clamp-2">{entry.content}</p>
          </CardContent>
        </Card>
      </SpotlightCard>
    </Link>
  ))
}
export default EntryCard
