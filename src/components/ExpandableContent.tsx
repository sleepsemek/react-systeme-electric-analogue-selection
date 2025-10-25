import {type PropsWithChildren, useEffect, useRef} from "react"

type ExpandableContentProps = PropsWithChildren<{
    open: boolean
    className?: string
}>

export default function ExpandableContent({ open, children, className = ''}: ExpandableContentProps) {
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const onTransitionEnd = (transitionEvent: TransitionEvent)=> {
            if ((transitionEvent.propertyName ?? transitionEvent) !== 'height') return
            if (open) {
                element.style.height = 'auto'
            }
        }

        element.addEventListener('transitionend', onTransitionEnd)

        if (open) {
            const startHeight = element.offsetHeight
            const target = element.scrollHeight

            element.style.height = startHeight + 'px'

            requestAnimationFrame(() => element.style.height = target + 'px')
        } else {
            const actualHeight = element.offsetHeight
            element.style.height = actualHeight + 'px'

            requestAnimationFrame(() => element.style.height = '0px')
        }

        return () => element.removeEventListener('transitionend', onTransitionEnd)
    }, [open])

    return (
        <div
            ref={ref}
            className={`overflow-hidden translation-[height] duration-200 ${className}`}
            style={{
                willChange: 'height'
            }}
            aria-hidden={!open}
        >
            {children}
        </div>
    )
}