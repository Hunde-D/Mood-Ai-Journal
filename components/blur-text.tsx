'use client'
import { useRef, useEffect, useState } from 'react'
import { useSprings, animated } from '@react-spring/web'
import GradientText from './Gradiant'

export const BlurText = ({ text, delay = 200, className = '' }) => {
  const words = [text]
  const [inView, setInView] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(ref.current) // Unobserve after triggering the animation
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  const springs = useSprings(
    words.length,
    words.map((_, i) => ({
      from: {
        filter: 'blur(10px)',
        opacity: 0,
        transform: 'translate3d(0,-50px,0)',
      },
      to: inView
        ? async (next) => {
            await next({
              filter: 'blur(5px)',
              opacity: 0.5,
              transform: 'translate3d(0,5px,0)',
            })
            await next({
              filter: 'blur(0px)',
              opacity: 1,
              transform: 'translate3d(0,0,0)',
            })
          }
        : { filter: 'blur(10px)', opacity: 0 },
      delay: i * delay,
    })),
  )

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={props}
          className="will-change-filter will-change-opacity inline-block will-change-transform"
        >
          <GradientText
            colors={['#ffaa40', '#9c40ff', '#ffaa40']}
            animationSpeed={8}
            showBorder={false}
          >
            {words[index]}&nbsp;
          </GradientText>
        </animated.span>
      ))}
    </div>
  )
}
