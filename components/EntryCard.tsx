'use client'
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
const EntryCard = ({ entries }) => {
  return entries?.map((entry) => (
    <Link href={`/journal/${entry.id}`} key={entry.id}>
      <Card className="w-72 cursor-pointer items-center justify-center">
        <CardHeader>
          <CardTitle>Mood</CardTitle>
          <CardDescription>
            {new Date(entry.updatedAt).toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="line-clamp-4 flex items-center justify-start">
          {entry.content}
        </CardContent>
      </Card>
    </Link>
  ))
}
export default EntryCard
