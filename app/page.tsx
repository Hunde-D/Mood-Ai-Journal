import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import NavHeader from '@/components/nav-header'
import { BlurText } from '@/components/blur-text'
import { UserReview } from '@/components/user-reviews'
import { FeatureGrid } from '@/components/feature-grid'
import Footer from '@/components/footer'
import Ripple from '@/components/ui/ripple'
import CustomParticles from '@/components/custom-particles'
import AnimatedShinyText from '@/components/ui/animated-shiny-text'
import SparklesText from '@/components/ui/sparkles-text'
import { RainbowButton } from '@/components/ui/rainbow-button'

export default function LandingPage() {
  return (
    <div className="moodAiBackground relative flex min-h-screen flex-col overflow-hidden text-foreground transition-colors duration-300">
      {/* Nav Header */}
      <NavHeader />
      <main className="relative z-10 flex-grow pt-20">
        <div className="mx-auto flex w-full flex-col gap-20 py-12 md:py-20">
          <div className="mb-12 text-center">
            {/* Custom Particles */}
            <CustomParticles />
            {/* Ripple */}
            <Ripple mainCircleOpacity={0.24} numCircles={15} />
            <AnimatedShinyText className="mx-auto mt-14 items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Introducing Mood AI Journal v2.0</span>
            </AnimatedShinyText>
            {/* Blur Text */}

            <BlurText
              text="A Journal That Understands You"
              className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl"
              delay={50}
            />
            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-xl">
              Transform your journaling with AI insights—track, understand, and
              grow from your reflections.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <RainbowButton>
                Start Your Journey <ArrowRight className="ml-2" />
              </RainbowButton>
            </div>
          </div>

          {/* Features Grid */}
          <FeatureGrid />
          <div className="flex w-full justify-center">
            <article className="flex w-3/4 flex-col px-6 text-center lg:w-1/2">
              <h2 className="mb-6 text-4xl font-extrabold leading-snug opacity-90">
                <SparklesText text="Mood AI Journal" />
                redefines personal journaling.
              </h2>

              <p className="text-lg text-gray-600">
                <span className="text-primary">Mood AI Journal</span> isn’t just
                a place for your thoughts—it’s a guide, a companion, and a
                source of insights to help you grow emotionally and mentally.
              </p>
              <p className="mt-4 font-medium text-gray-800">
                — Hunde Desalegn <br />
                <span className="text-gray-600">
                  Creator of Mood AI Journal
                </span>
              </p>
            </article>
          </div>

          {/* User Reviews */}
          <UserReview />
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  )
}
