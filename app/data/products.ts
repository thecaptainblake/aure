import rawProducts from './products.json'
import type { Product, RawProduct } from '~/types/product'

function resolveImage(filename: string): string {
  return `/products/${filename}`
}

function resolveGallery(raw: RawProduct): string[] {
  const filenames = raw.gallery ?? [raw.image, 'demo_1.png', 'demo_2.png']
  return [...new Set(filenames)].map(resolveImage)
}

export const products: Product[] = (rawProducts as RawProduct[]).map((product) => ({
  title: product.title,
  description: product.description,
  category: product.category,
  price: product.price,
  image: resolveImage(product.image),
  gallery: resolveGallery(product),
}))
