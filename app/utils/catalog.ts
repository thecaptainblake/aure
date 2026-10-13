import type { Product } from '#shared/catalog'

export const priceBands = [
  { id: 'all', label: 'Todos los precios' },
  { id: 'under-1500', label: 'Menos de $1,500' },
  { id: '1500-3000', label: '$1,500 a $3,000' },
  { id: 'over-3000', label: 'Más de $3,000' },
] as const

export type PriceBand = (typeof priceBands)[number]['id']

export const isPriceBand = (value: unknown): value is PriceBand =>
  typeof value === 'string' && priceBands.some((band) => band.id === value)

export const matchesPriceBand = (price: number, band: PriceBand) => {
  if (band === 'all') return true
  if (band === 'under-1500') return price < 1500
  if (band === '1500-3000') return price >= 1500 && price <= 3000
  return price > 3000
}

export interface CatalogQuery {
  slug: string
  price: PriceBand
  search: string
}

export const filterProducts = (products: Product[], query: CatalogQuery) => {
  const term = query.search.trim().toLocaleLowerCase('es-MX')

  return products.filter((product) => {
    if (query.slug !== 'todos' && product.category.slug !== query.slug) return false
    if (!matchesPriceBand(product.price, query.price)) return false
    if (!term) return true
    const haystack = `${product.name} ${product.description}`.toLocaleLowerCase('es-MX')
    return haystack.includes(term)
  })
}
