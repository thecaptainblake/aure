export interface Testimonial {
  id: string
  quote: string
  name: string
  place: string
  photo: {
    src: string
    alt: string
    width: number
    height: number
  }
}

/** Textos y retratos de muestra. Sustituir por reseñas reales antes de publicar. */
export const testimonials: Testimonial[] = [
  {
    id: 'mariana',
    quote: 'Me explicaron la pieza por WhatsApp y llegó tal cual la foto.',
    name: 'Mariana',
    place: 'Monterrey',
    photo: {
      src: '/testimonials/cliente-1.jpg',
      alt: 'Retrato de Mariana, de Monterrey',
      width: 200,
      height: 200,
    },
  },
  {
    id: 'andrea',
    quote: 'El oro se siente ligero y el cierre quedó perfecto.',
    name: 'Andrea',
    place: 'San Pedro',
    photo: {
      src: '/testimonials/cliente-2.jpg',
      alt: 'Retrato de Andrea, de San Pedro',
      width: 200,
      height: 200,
    },
  },
  {
    id: 'lucia',
    quote: 'Pedí la talla del anillo y me la confirmaron el mismo día.',
    name: 'Lucía',
    place: 'Guadalupe',
    photo: {
      src: '/testimonials/cliente-3.jpg',
      alt: 'Retrato de Lucía, de Guadalupe',
      width: 200,
      height: 200,
    },
  },
]
