import Image from 'next/image'
import journal from '@/images/journalCover.jpg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mb-3 flex h-80 w-full justify-between p-2">
        <Button
          variant="outline"
          className="text-2xl hover:border hover:border-[hsl(24.6,95%,53.1%)] hover:text-[hsl(24.6,95%,53.1%)]"
        >
          +
        </Button>
        <Button
          asChild
          className="ml-auto hover:border hover:border-[hsl(24.6,95%,53.1%)] hover:text-[hsl(24.6,95%,53.1%)]"
          variant="outline"
        >
          <Link href="/">Get Started</Link>
        </Button>
      </div>
      <div className="flex w-[60%] justify-between text-xs">
        <p>SelfReflection</p>
        <p>MoodTracker</p>
        <p>MoodAnalysis</p>
        <p>AIJournal</p>
      </div>
      <h1
        className="flex w-full justify-center text-[14rem] leading-none"
        style={{ color: 'hsl(var(--primary))' }}
      >
        .JOURNAL
      </h1>
      <div className="h-full w-full flex-auto overflow-hidden bg-red-300">
        <Image
          src={journal}
          alt="hero"
          className="w-full"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  )
}
