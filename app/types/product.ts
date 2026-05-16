export interface RawProduct {
  title: string
  description: string
  category: string
  price: string
  image: string
  gallery?: string[]
}

export interface Product {
  title: string
  description: string
  category: string
  price: string
  image: string
  gallery: string[]
}
