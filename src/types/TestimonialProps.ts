export interface TestimonialProps {
    id: number,
    name: string,
    role: string,
    text: string,
    img: string,
    href?: string
    ratingImg?: string
    website?: {
        name: 'Khamsat' | 'Mostaql' | 'External',
        img: string
    }
}