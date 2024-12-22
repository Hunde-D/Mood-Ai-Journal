'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import Particles from '@/components/ui/particles'

const CustomParticles = () => {
  const { resolvedTheme } = useTheme()
  const [color, setColor] = useState('#ffffff')
  useEffect(() => {
    setColor(resolvedTheme === 'dark' ? '#ffffff' : '#000000')
  }, [resolvedTheme])

  return (
    <Particles
      className="absolute inset-0"
      quantity={500}
      ease={100}
      color={color}
      refresh
    />
  )
}

export default CustomParticles
