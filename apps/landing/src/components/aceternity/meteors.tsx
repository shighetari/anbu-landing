'use client'

import { cn } from '@/lib/utils'
import { deterministicRandom } from '@/lib/random'
import React, { useMemo } from 'react'

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number
  className?: string
}) => {
  // Generate deterministic values based on index to avoid hydration mismatch
  const randomForIndex = (index: number, offset: number) =>
    deterministicRandom(index * 97 + offset)

  const meteors = useMemo(() => {
    return new Array(number).fill(true).map((_, idx) => {
      const sizeValue = randomForIndex(idx, 1)
      const trailValue = randomForIndex(idx, 2)

      return {
        key: idx,
        // Extended range to cover more of the page width (was -400 to 327, now -1200 to 1200)
        left: -1200 + (2400 * ((idx * 7) % 11)) / 11,
        delay: 0.2 + (0.6 * ((idx * 3) % 7)) / 7,
        duration: 2 + (8 * ((idx * 5) % 9)) / 9,
        // Add some meteors with different sizes for variety
        size: sizeValue > 0.7 ? 'w-1 h-1' : 'w-0.5 h-0.5',
        // Some meteors get brighter trails
        trailOpacity: trailValue > 0.6 ? '#FFD700cc' : '#FFD70064',
      }
    })
  }, [number])

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={'meteor' + meteor.key}
          className={cn(
            'animate-meteor-effect absolute top-1/2 left-1/2 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
            meteor.size, // Apply variable size
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[150px] before:h-[1px] before:bg-gradient-to-r before:from-[#FFD700cc] before:via-[#FFD70099] before:to-transparent",
            className
          )}
          style={{
            top: '50%',
            left: `${meteor.left}px`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        ></span>
      ))}
    </>
  )
}
