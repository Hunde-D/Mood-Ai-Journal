import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ThemeSwitch from '@/components/ThemeSwitch'
import GradientText from '@/components/Gradiant'

export default function Home() {
  return (
    <div className="grid h-screen w-full grid-rows-2">
      <div className="moodJournal grid h-full w-full">
        <div className="flex w-full justify-between px-4 py-2">
          <ThemeSwitch />
          <Link href="/journal">
            <GradientText
              colors={['#ffaa40', '#ea580c', '#FFFB7D']}
              animationSpeed={3}
              showBorder={true}
              className="rounded-md p-1 px-2"
            >
              Get Started
            </GradientText>
          </Link>
        </div>
        <div className="mx-auto flex w-fit justify-between gap-40 text-xs">
          <p>SelfReflection</p>
          <p>MoodTracker</p>
          <p>MoodAnalysis</p>
          <p>AIJournal</p>
        </div>
        <h1 className="mx-auto w-fit justify-center place-self-end text-[14rem] leading-none text-primary">
          MOOD AI
        </h1>
      </div>
      <div className="moodBackground h-full w-full bg-black dark:bg-white">
        <h2 className="flex w-full justify-center text-[14rem] leading-none text-primary">
          .JOURNAL
        </h2>
      </div>
    </div>
  )
}
