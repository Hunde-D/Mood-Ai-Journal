import { Brain, BarChart2, Sparkles, Globe, WandSparkles } from 'lucide-react'

import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'

const features = [
  {
    Icon: Brain,
    name: 'AI-Powered Analysis',
    description:
      'Our advanced AI analyzes your journal entries to understand emotional patterns and provide personalized insights, helping you gain deeper self-awareness.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
  },
  {
    Icon: Sparkles,
    name: 'Mood Tracking',
    description:
      'Automatically tag and categorize your emotions, making it easy to track your mood over time.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    Icon: WandSparkles,
    name: 'Personalized Advice',
    description: 'Actionable recommendations based on your reflections.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
  {
    Icon: Globe,
    name: 'Multilingual',
    description: 'Supports 100+ languages and counting.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    Icon: BarChart2,
    name: 'Visual Insights',
    description:
      'Explore your emotional journey through an interactive dashboard with beautiful visualizations.',
    href: '/',
    cta: 'Learn more',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
  },
]

export function FeatureGrid() {
  return (
    <BentoGrid className="mt-10 px-4 md:px-6 lg:grid-rows-3 lg:px-8">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  )
}
