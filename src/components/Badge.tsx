import type {PropsWithChildren} from "react";

export default function Badge({ children }: PropsWithChildren) {
    return (
        <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">{ children }</span>
    )
}