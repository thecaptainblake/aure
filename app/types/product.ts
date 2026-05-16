export interface RawProduct {
  title: string
  description: string
  price: string
  image: string
  gallery?: string[]
}

export interface Product {
  title: string
  description: string
  price: string
  image: string
  gallery: string[]
}
