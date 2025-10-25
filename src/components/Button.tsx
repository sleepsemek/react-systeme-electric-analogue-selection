import {type PropsWithChildren, type ReactNode, type SyntheticEvent} from "react";

type ButtonProps = PropsWithChildren<{
    variant?: 'primary' | 'cancel' | 'rectangular' | 'transparent'
    icon?: ReactNode
    onClick?: (e: SyntheticEvent) => void
    className?: string
}>

export default function Button({
    variant = 'primary',
    icon,
    onClick,
    children,
    className = ''
}: ButtonProps) {
    const classNames = {
        primary: `btn-primary w-full sm:w-auto gap-2`,
        rectangular: `btn-rect flex items-center gap-2`,
        transparent: `text-primary hover:text-primary-darker text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary-container transition-colors`,
        cancel: `btn-cancel sm:w-auto gap-2`
    }

    return (
            <button
                onClick={onClick}
                className={`${classNames[variant]} ${className}`}
                type="button"
            >
                { icon }
                { children }
            </button>
        )
}