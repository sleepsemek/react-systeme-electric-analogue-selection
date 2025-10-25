import type {PropsWithChildren} from "react"

export default function Section({ children }: PropsWithChildren) {
    return (
        <section className="bg-dark-container text-white rounded-xl shadow-sm overflow-hidden p-4 sm:p-6 not-last:mb-3 not-last:sm:mb-6">
            { children }
        </section>
    )
}