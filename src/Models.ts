import type {ReactNode} from "react";

export type Param = {
    name: string;
    req: string;
    analog: string;
    important?: boolean;
}

export type Item = {
    id: string;
    brand: string;
    model: string;
    score: number;
    imageSvg: ReactNode;
    params: Param[];
    explanation: string;
}

export type Alternative = {
    id: string;
    title: string;
    score: number;
}