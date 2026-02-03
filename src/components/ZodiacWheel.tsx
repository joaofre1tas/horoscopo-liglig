import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { calculateZodiac, zodiacSigns, type ZodiacSign } from '@/lib/zodiac'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Search } from 'lucide-react'

interface ZodiacWheelProps {
  onResult: (sign: ZodiacSign) => void
}

export function ZodiacWheel({ onResult }: ZodiacWheelProps) {
  const [year, setYear] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSpin = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate year
    const yearNum = parseInt(year)
    if (
      isNaN(yearNum) ||
      year.length !== 4 ||
      yearNum < 1900 ||
      yearNum > 2100
    ) {
      setError(true)
      inputRef.current?.focus()
      // Shake animation effect could be added here
      return
    }
    setError(false)

    if (isSpinning) return

    const sign = calculateZodiac(yearNum)
    setIsSpinning(true)

    // Calculate rotation
    // Each segment is 360/12 = 30 degrees.
    // Index 0 is at top (0 degrees or -90 degrees depending on SVG start).
    // Our SVG starts at 3 o'clock (0 degrees). We want index 0 at 12 o'clock (-90 degrees).
    // Actually, let's keep it simple:
    // If we want index `i` to be at the top pointer.
    // We need to rotate the wheel such that segment `i` aligns with the pointer.
    // Let's assume the pointer is at the TOP (270deg / -90deg visually).
    // If the wheel is constructed with segment 0 starting at -15deg to 15deg (centered at 0deg - Right).
    // Wait, let's look at the SVG construction below.
    // I'll construct segment 0 at the top (-90deg relative to 0 which is right).
    // To keep it simple: Segment 0 is at rotation 0.
    // To show Segment i, we rotate - (i * 30).
    // Add extra spins: 5 * 360.

    const segmentAngle = 360 / 12
    const targetIndex = sign.id

    // We want to land on the target index.
    // Current rotation logic:
    const spins = 5
    const baseRotation = 360 * spins
    const targetRotation = -(targetIndex * segmentAngle)

    // Random offset to land in the middle of the segment
    // const randomOffset = Math.random() * 20 - 10

    const newRotation =
      rotation + baseRotation + targetRotation - (rotation % 360)

    setRotation(newRotation)

    // Animation duration 4s
    setTimeout(() => {
      setIsSpinning(false)
      onResult(sign)
    }, 4000)
  }

  // SVG Helper to create segments
  const radius = 150
  const center = 150

  const createSectorPath = (index: number, total: number) => {
    const startAngle = (index * 360) / total - 90 - 15 // Start 15deg before top to center segment at top
    const endAngle = startAngle + 360 / total

    // Convert to radians
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1 = center + radius * Math.cos(startRad)
    const y1 = center + radius * Math.sin(startRad)
    const x2 = center + radius * Math.cos(endRad)
    const y2 = center + radius * Math.sin(endRad)

    return `M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`
  }

  return (
    <div className="relative mx-auto flex w-full max-w-[500px] flex-col items-center justify-center">
      {/* Pointer */}
      <div className="absolute top-0 z-20 -mt-4 text-secondary drop-shadow-lg">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 22L5 10H19L12 22Z" />
        </svg>
      </div>

      {/* Wheel Container */}
      <div className="relative h-[300px] w-[300px] md:h-[450px] md:w-[450px]">
        <div
          className="h-full w-full transition-transform duration-[4000ms] ease-out-quad"
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <svg viewBox="0 0 300 300" className="h-full w-full drop-shadow-2xl">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient
                id="goldGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
            <circle
              cx="150"
              cy="150"
              r="148"
              fill="#1a1a1a"
              stroke="url(#goldGradient)"
              strokeWidth="4"
            />

            {zodiacSigns.map((sign) => (
              <g key={sign.id} className="wheel-segment hover:opacity-90">
                <path
                  d={createSectorPath(sign.id, 12)}
                  fill={sign.id % 2 === 0 ? '#B71C1C' : '#C62828'} // Alternating reds
                  stroke="#FFD700"
                  strokeWidth="1"
                  className="transition-colors duration-300"
                />
                {/* Icon placeholder positioning */}
                <g
                  transform={`
                            translate(${
                              150 +
                              110 *
                                Math.cos(((sign.id * 30 - 90) * Math.PI) / 180)
                            }, ${
                              150 +
                              110 *
                                Math.sin(((sign.id * 30 - 90) * Math.PI) / 180)
                            })
                            rotate(${sign.id * 30})
                        `}
                >
                  <image
                    href={`https://img.usecurling.com/i?q=${sign.iconQuery}&color=yellow&shape=outline`}
                    x="-15"
                    y="-15"
                    height="30"
                    width="30"
                    className="drop-shadow-sm"
                  />
                </g>
              </g>
            ))}
          </svg>
        </div>

        {/* Center Control - Absolute Center of Wheel */}
        <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-black/90 p-6 shadow-2xl ring-4 ring-secondary/50 backdrop-blur-sm">
          <form
            onSubmit={handleSpin}
            className="flex flex-col items-center gap-3"
          >
            <div className="text-center">
              <label
                htmlFor="year"
                className="mb-1 block text-xs font-bold uppercase tracking-widest text-secondary"
              >
                Ano de Nasc.
              </label>
              <Input
                ref={inputRef}
                id="year"
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="AAAA"
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
                className={cn(
                  'h-10 w-24 border-0 border-b-2 bg-transparent text-center font-display text-2xl font-bold text-white focus-visible:border-secondary focus-visible:ring-0',
                  error && 'border-destructive text-destructive animate-pulse',
                )}
                disabled={isSpinning}
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="w-full rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 font-bold text-black shadow-lg transition-all hover:scale-105 hover:shadow-yellow-500/20 disabled:opacity-50"
              disabled={isSpinning || !year}
            >
              {isSpinning ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="ml-1">{isSpinning ? '...' : 'Revelar'}</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
