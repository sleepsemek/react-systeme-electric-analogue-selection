import type {PropsWithChildren} from "react";

export default function Section({ children }: PropsWithChildren) {
    return (
        <section className="bg-dark-container text-white rounded-xl shadow-sm overflow-hidden p-6 mb-8">
            { children }
        </section>
    )
}