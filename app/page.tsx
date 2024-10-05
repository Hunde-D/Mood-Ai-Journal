import Link from 'next/link'
import ThemeSwitch from '@/components/ThemeSwitch'
import GradientText from '@/components/Gradiant'

export default function Home() {
  return (
    <div className="grid h-screen w-screen grid-rows-2">
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
        <div className="mx-auto flex w-full justify-between text-xs max-lg:px-3 lg:w-fit lg:gap-40">
          <p>SelfReflection</p>
          <p className="hidden lg:block">MoodTracker</p>
          <p>MoodAnalysis</p>
          <p>AIJournal</p>
        </div>
        <h1 className="mx-auto w-fit justify-center place-self-end text-[6rem] leading-none text-primary lg:text-[14rem]">
          MOOD AI
        </h1>
      </div>
      <div className="moodJournal h-full w-full bg-black dark:bg-white">
        <h2 className="flex w-full justify-center text-[5.5rem] leading-none text-primary lg:text-[14rem]">
          .JOURNAL
        </h2>
      </div>
    </div>
  )
}
