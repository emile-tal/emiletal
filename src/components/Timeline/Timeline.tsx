import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import type { Experience } from '../../types'

interface TimelineProps {
    experiences: Experience[]
}

// Page pixels scrolled per pixel the timeline moves. Higher = slower, more deliberate.
const SCROLL_SPEED = 1.6

// Where the highlighted entry sits in the frame, as a fraction of its height from the top.
// It drifts from START to END as you scroll, so the first entry sits near the top of the
// frame and the last one settles lower instead of leaving empty space beneath it.
const FOCUS_START = 0.22
// Mirror of FOCUS_START so the last entry rests as far from the bottom as the first does from the top
const FOCUS_END = 1 - FOCUS_START

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
 * absorb the scroll distance, while a sticky full-screen frame holds the viewport still.
 * Scroll progress through the wrapper drives the timeline track upward, so the page
 * appears frozen while only the timeline moves. Because it is plain page scroll,
 * keyboard, trackpad, and scrollbar all keep working.
 */
export function Timeline({ experiences }: TimelineProps) {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [activeIndex, setActiveIndex] = useState(0)
    const [wrapperHeight, setWrapperHeight] = useState<number>()

    const wrapperRef = useRef<HTMLDivElement>(null)
    const stickyRef = useRef<HTMLDivElement>(null)
    const frameRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const fillRef = useRef<HTMLDivElement>(null)
    const hintRef = useRef<HTMLParagraphElement>(null)
    const itemRefs = useRef<(HTMLLIElement | null)[]>([])

    useEffect(() => {
        const wrapper = wrapperRef.current
        const sticky = stickyRef.current
        const frame = frameRef.current
        const track = trackRef.current
        const line = lineRef.current
        const fill = fillRef.current
        if (prefersReducedMotion || !wrapper || !sticky || !frame || !track || !line || !fill) return

        let travel = 0
        let stickyTop = 0
        let animationFrame = 0

        const update = () => {
            animationFrame = 0
            const pinnedFor = stickyTop - wrapper.getBoundingClientRect().top
            // If the page ends before the pin would release (short footer, tall phone),
            // finish the timeline at the bottom of the page instead of adding blank space.
            const pinStart = window.scrollY - pinnedFor
            const pageRemaining = document.documentElement.scrollHeight - window.innerHeight - pinStart
            const scrollable = Math.min(travel * SCROLL_SPEED, pageRemaining)
            const progress = scrollable > 0 ? clamp(pinnedFor / scrollable, 0, 1) : 0
            const offset = travel * progress

            track.style.transform = `translate3d(0, ${-offset}px, 0)`
            fill.style.transform = `scaleY(${progress})`
            if (hintRef.current) hintRef.current.style.opacity = progress > 0.02 ? '0' : '1'

            // Highlight whichever entry sits closest to the focus line
            const focusLine = offset + frame.clientHeight * (FOCUS_START + (FOCUS_END - FOCUS_START) * progress)
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
            const height = frame.clientHeight

            // Pad the track so the first entry starts on the start focus and the last ends on the end focus
            track.style.paddingTop = `${Math.max(0, height * FOCUS_START - items[0].offsetHeight / 2)}px`
            track.style.paddingBottom = `${Math.max(0, height * (1 - FOCUS_END) - items[items.length - 1].offsetHeight / 2)}px`
            travel = Math.max(0, track.scrollHeight - frame.clientHeight)

            // The rail runs from the first dot to the last; its fill tip tracks the focus line
            line.style.top = `${height * FOCUS_START}px`
            line.style.height = `${travel + height * (FOCUS_END - FOCUS_START)}px`

            // The pinned frame holds still for `travel * SCROLL_SPEED` px of page scroll
            stickyTop = parseFloat(getComputedStyle(sticky).top) || 0
            setWrapperHeight(sticky.offsetHeight + travel * SCROLL_SPEED)
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
                className='relative flex items-center py-7 pl-10 tablet:py-11 tablet:pl-16'
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
                    <p className='meta-text flex items-center gap-2'>
                        <time>{experience.startDate}</time>
                        <span aria-hidden='true'>–</span>
                        <span className='sr-only'>to</span>
                        <time>{experience.endDate}</time>
                        {isCurrent && (
                            <span className='ml-1 rounded-full bg-navy px-2 py-0.5 text-[0.7rem] text-cream uppercase tracking-wider tablet:text-[0.8rem]'>Now</span>
                        )}
                    </p>
                    <h3 className='card-title'>{experience.title}</h3>
                    <p className='body-text'>
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
            <div className='relative max-w-[40rem] mx-auto'>
                <div aria-hidden='true' className='absolute left-3 tablet:left-5 top-6 bottom-6 w-0.5 -translate-x-1/2 bg-navy' />
                <ol aria-label='Career timeline, most recent first'>{entries}</ol>
            </div>
        )
    }

    return (
        <div ref={wrapperRef} className='relative' style={{ height: wrapperHeight }}>
            <div ref={stickyRef} className='sticky top-0 h-svh'>
                <div
                    ref={frameRef}
                    className='relative w-full max-w-[40rem] h-full mx-auto overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]'
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
                    className='absolute inset-x-0 bottom-0 pt-[10svh] pb-[4svh] bg-linear-to-t from-cream via-cream/90 to-transparent text-center meta-text transition-opacity duration-300'
                >
                    Scroll to go back in time <span className='inline-block motion-safe:animate-bounce'>↓</span>
                </p>
            </div>
        </div>
    )
}
