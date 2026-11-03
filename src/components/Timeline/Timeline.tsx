import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import type { Experience } from '../../types'

interface TimelineProps {
    experiences: Experience[]
}

// Page pixels scrolled per pixel the timeline moves. Higher = slower, more deliberate.
const SCROLL_SPEED = 1.6

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function usePrefersReducedMotion() {
    return useSyncExternalStore(
        callback => {
            const media = window.matchMedia(reducedMotionQuery)
            media.addEventListener('change', callback)
            return () => media.removeEventListener('change', callback)
        },
        () => window.matchMedia(reducedMotionQuery).matches,
        () => false
    )
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/**
 * Vertical career timeline, newest first.
 *
 * The scroll effect is a "pinned" section: the outer wrapper is made tall enough to
 * absorb the scroll distance, while a sticky inner frame holds the viewport still.
 * Scroll progress through the wrapper drives the timeline track upward, so the page
 * appears frozen while only the timeline moves. Because it is plain page scroll,
 * keyboard, trackpad, and scrollbar all keep working.
 */
export function Timeline({ experiences }: TimelineProps) {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [activeIndex, setActiveIndex] = useState(0)
    const [wrapperHeight, setWrapperHeight] = useState<number>()

    const wrapperRef = useRef<HTMLDivElement>(null)
    const frameRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const fillRef = useRef<HTMLDivElement>(null)
    const hintRef = useRef<HTMLParagraphElement>(null)
    const itemRefs = useRef<(HTMLLIElement | null)[]>([])

    useEffect(() => {
        const wrapper = wrapperRef.current
        const frame = frameRef.current
        const track = trackRef.current
        const line = lineRef.current
        const fill = fillRef.current
        if (prefersReducedMotion || !wrapper || !frame || !track || !line || !fill) return

        let travel = 0
        let animationFrame = 0

        const update = () => {
            animationFrame = 0
            const scrollable = travel * SCROLL_SPEED
            const progress = scrollable > 0 ? clamp(-wrapper.getBoundingClientRect().top / scrollable, 0, 1) : 0
            const offset = travel * progress

            track.style.transform = `translate3d(0, ${-offset}px, 0)`
            fill.style.transform = `scaleY(${progress})`
            if (hintRef.current) hintRef.current.style.opacity = progress > 0.02 ? '0' : '1'

            // Highlight whichever entry sits closest to the middle of the frame
            const focusLine = offset + frame.clientHeight / 2
            let closest = 0
            let closestDistance = Infinity
            itemRefs.current.forEach((item, index) => {
                if (!item) return
                const distance = Math.abs(item.offsetTop + item.offsetHeight / 2 - focusLine)
                if (distance < closestDistance) {
                    closest = index
                    closestDistance = distance
                }
            })
            setActiveIndex(closest)
        }

        const measure = () => {
            const items = itemRefs.current.filter((item): item is HTMLLIElement => item !== null)
            if (items.length === 0) return
            const half = frame.clientHeight / 2

            // Pad the track so the first entry starts centred and the last entry ends centred
            track.style.paddingTop = `${half - items[0].offsetHeight / 2}px`
            track.style.paddingBottom = `${half - items[items.length - 1].offsetHeight / 2}px`
            travel = Math.max(0, track.scrollHeight - frame.clientHeight)

            // The rail runs from the first dot to the last; its fill tip tracks the frame's centre
            line.style.top = `${half}px`
            line.style.height = `${travel}px`

            setWrapperHeight(window.innerHeight + travel * SCROLL_SPEED)
            update()
        }

        const requestUpdate = () => {
            if (!animationFrame) animationFrame = requestAnimationFrame(update)
        }

        const resizeObserver = new ResizeObserver(measure)
        resizeObserver.observe(frame)
        itemRefs.current.forEach(item => item && resizeObserver.observe(item))
        window.addEventListener('scroll', requestUpdate, { passive: true })
        window.addEventListener('resize', measure)
        measure()

        return () => {
            cancelAnimationFrame(animationFrame)
            resizeObserver.disconnect()
            window.removeEventListener('scroll', requestUpdate)
            window.removeEventListener('resize', measure)
            track.removeAttribute('style')
        }
    }, [prefersReducedMotion, experiences])

    const entries = experiences.map((experience, index) => {
        const isCurrent = experience.endDate === 'Present'
        const isActive = prefersReducedMotion || index === activeIndex
        const isPast = !prefersReducedMotion && index < activeIndex

        return (
            <li
                key={`${experience.company}-${experience.startDate}`}
                ref={element => { itemRefs.current[index] = element }}
                aria-current={isCurrent ? 'step' : undefined}
                className='relative flex items-center py-6 pl-10 tablet:py-10 tablet:pl-16'
            >
                <span
                    aria-hidden='true'
                    className={`absolute left-3 tablet:left-5 -translate-x-1/2 rounded-full border-2 border-navy motion-safe:transition-[width,height,background-color] motion-safe:duration-500 ${isActive
                        ? 'w-5 h-5 bg-tan tablet:w-6 tablet:h-6'
                        : `w-3 h-3 ${isPast ? 'bg-navy' : 'bg-cream'}`
                    }`}
                >
                    {isCurrent && isActive && (
                        <span className='absolute inset-0 rounded-full bg-tan motion-safe:animate-ping' />
                    )}
                </span>
                <article
                    className={`flex flex-col gap-1 font-poppins text-navy origin-left motion-safe:transition-[opacity,transform] motion-safe:duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-35 scale-95'}`}
                >
                    <p className='flex items-center gap-2 text-[0.8rem] tablet:text-[1rem] text-bronze'>
                        <time>{experience.startDate}</time>
                        <span aria-hidden='true'>–</span>
                        <span className='sr-only'>to</span>
                        <time>{experience.endDate}</time>
                        {isCurrent && (
                            <span className='ml-1 rounded-full bg-navy px-2 py-0.5 text-[0.7rem] text-cream uppercase tracking-wider tablet:text-[0.8rem]'>Now</span>
                        )}
                    </p>
                    <h3 className='font-baskerville text-[1.3rem] leading-tight tablet:text-[2rem]'>{experience.title}</h3>
                    <p className='text-[0.9rem] tablet:text-[1.1rem]'>
                        <span className='font-semibold'>{experience.company}</span>
                        <span aria-hidden='true'> · </span>
                        <span className='sr-only'>, </span>
                        {experience.location}
                    </p>
                </article>
            </li>
        )
    })

    if (prefersReducedMotion) {
        return (
            <div className='relative max-w-[40rem] mx-auto my-4'>
                <div aria-hidden='true' className='absolute left-3 tablet:left-5 top-10 bottom-10 w-0.5 -translate-x-1/2 bg-navy' />
                <ol aria-label='Career timeline, most recent first'>{entries}</ol>
            </div>
        )
    }

    return (
        <div ref={wrapperRef} className='relative' style={{ height: wrapperHeight }}>
            <div className='sticky top-0 flex flex-col justify-center h-svh'>
                <div
                    ref={frameRef}
                    className='relative w-full max-w-[40rem] mx-auto h-[75svh] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]'
                >
                    <div ref={trackRef} className='relative will-change-transform'>
                        <div aria-hidden='true' ref={lineRef} className='absolute left-3 tablet:left-5 w-0.5 -translate-x-1/2 bg-sand'>
                            <div ref={fillRef} className='w-full h-full origin-top bg-navy will-change-transform' />
                        </div>
                        <ol aria-label='Career timeline, most recent first'>
                            {entries}
                        </ol>
                    </div>
                </div>
                <p
                    ref={hintRef}
                    aria-hidden='true'
                    className='mx-auto mt-2 font-poppins text-[0.8rem] text-bronze transition-opacity duration-300 tablet:text-[0.9rem]'
                >
                    Scroll to go back in time <span className='inline-block motion-safe:animate-bounce'>↓</span>
                </p>
            </div>
        </div>
    )
}
