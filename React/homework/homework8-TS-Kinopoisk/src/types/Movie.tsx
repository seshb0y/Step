import { JSX } from "react/jsx-runtime";

export type Movie = {
    map(arg0: (element: any) => JSX.Element): import("react").ReactNode;
    id: number,
    background_image_original: string,
    large_cover_image: string,
    medium_cover_image: string,
    rating: number,
    title: string,
    year: number,
}