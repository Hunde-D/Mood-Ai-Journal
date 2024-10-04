'use client'
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatTime } from '@/utils/formatDate'
import Link from 'next/link'
const EntryCard = ({ entries }) => {
  return entries?.map((entry) => (
    <Link
      href={`/journal/${entry.id}`}
      key={entry.id}
      className="h-40 w-72 max-w-80 flex-auto"
    >
      <Card className="h-full w-full cursor-pointer items-center justify-center">
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
    </Link>
  ))
}
export default EntryCard
