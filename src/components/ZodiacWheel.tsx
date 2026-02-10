import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { calculateZodiac, zodiacSigns, type ZodiacSign } from '@/lib/zodiac'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Sparkles } from 'lucide-react'

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
      return
    }
    setError(false)

    if (isSpinning) return

    const sign = calculateZodiac(yearNum)
    setIsSpinning(true)

    // Calculate rotation: We want the selected sign at the TOP (0 degrees visual)
    const segmentAngle = 360 / 12
    const targetIndex = sign.id

    // To land at top, we need to rotate so the target segment aligns with -90deg or similar depending on implementation
    // My SVG starts at -90deg (top). Segment index 0 is at top.
    // So to put index X at top, we rotate by -X * 30deg.

    const spins = 5
    const baseRotation = 360 * spins
    const targetRotation = -(targetIndex * segmentAngle)

    // Add randomness for realism but lock to center of segment eventually? No, precise is better for UI.
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
    const startAngle = (index * 360) / total - 90 - 15 // Start 15deg before top to center segment at top (since 30deg width)
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
      {/* Indicator/Pointer - Highest Z-Index to overlap wheel */}
      <div className="absolute top-0 z-30 -mt-2 text-white drop-shadow-lg filter">
        <div className="h-8 w-8 rotate-45 transform rounded-sm bg-white shadow-md border-2 border-secondary"></div>
      </div>

      {/* Wheel Container */}
      <div className="relative h-[320px] w-[320px] md:h-[480px] md:w-[480px]">
        {/* Realistic Plate Shadow - Enhanced 3D Shadow Effect (Bottom-Left) */}
        <div className="absolute inset-2 z-0 rounded-full shadow-[-15px_25px_50px_-5px_rgba(0,0,0,0.8)] md:shadow-[-30px_50px_90px_-10px_rgba(0,0,0,0.85)]" />

        <div
          className="relative z-10 h-full w-full transition-transform will-change-transform"
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionDuration: '4000ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.1, 1)',
          }}
        >
          <svg viewBox="0 0 300 300" className="h-full w-full">
            {/* Outer Ring */}
            <circle
              cx="150"
              cy="150"
              r="148"
              fill="#E30613"
              stroke="#FFD700"
              strokeWidth="4"
            />

            {zodiacSigns.map((sign) => (
              <g key={sign.id} className="wheel-segment group">
                <path
                  d={createSectorPath(sign.id, 12)}
                  fill={sign.id % 2 === 0 ? '#C40510' : '#E30613'} // Subtle tone difference
                  stroke="#000000"
                  strokeWidth="1"
                  strokeOpacity="1"
                  className="transition-all duration-300 group-hover:fill-red-800"
                />
                {/* Animal Name / Icon */}
                <g
                  transform={`
                            translate(${
                              150 +
                              115 *
                                Math.cos(((sign.id * 30 - 90) * Math.PI) / 180)
                            }, ${
                              150 +
                              115 *
                                Math.sin(((sign.id * 30 - 90) * Math.PI) / 180)
                            })
                            rotate(${sign.id * 30})
                        `}
                >
                  {/* Text rotation adjustment to keep it somewhat readable or aligned outwards */}
                  <text
                    x="0"
                    y="0"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="900"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform="rotate(90)"
                    className="font-sans uppercase tracking-tighter"
                  >
                    {sign.name}
                  </text>
                </g>
              </g>
            ))}

            {/* Inner Ring Decorative */}
            <circle
              cx="150"
              cy="150"
              r="45"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          </svg>
        </div>

        {/* Center Control - Absolute Center of Wheel - Z-Index above wheel */}
        <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white p-6 shadow-[0_0_40px_rgba(227,6,19,0.3)] ring-4 ring-secondary/50 backdrop-blur-sm md:p-10">
          <form
            onSubmit={handleSpin}
            className="flex flex-col items-center gap-3"
          >
            <div className="text-center">
              <label
                htmlFor="year"
                className="mb-1 block text-[10px] font-medium uppercase tracking-widest text-primary md:text-xs"
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
                  'h-10 w-24 border-0 border-b-2 bg-transparent text-center font-sans text-2xl font-black text-primary placeholder:text-gray-300 focus-visible:border-secondary focus-visible:ring-0 md:h-12 md:w-32 md:text-3xl',
                  error && 'border-destructive text-destructive animate-pulse',
                )}
                disabled={isSpinning}
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="w-full whitespace-nowrap rounded-full bg-black px-6 font-black uppercase text-secondary shadow-lg transition-all hover:scale-105 hover:bg-black/90 disabled:opacity-50"
              disabled={isSpinning || !year}
            >
              {isSpinning ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              <span className="text-xs md:text-sm">
                {isSpinning ? 'Lendo o destino...' : 'REVELAR'}
              </span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
