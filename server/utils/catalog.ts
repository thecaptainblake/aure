import type { AdminCategory, AdminProduct, AdminProductImage, Product, ProductCategory } from '#shared/catalog'
import { fail } from './http'
import { anonSupabase, productImageUrl, serviceSupabase } from './supabase'

const PRODUCT_SELECT = `
  id, sku, name, description, price, stock, is_visible, sort_order,
  categories ( id, slug, name, sort_order ),
  product_images ( id, storage_path, alt, width, height, sort_order )
`

interface ImageRow {
  id: string
  storage_path: string
  alt: string
  width: number
  height: number
  sort_order: number
}

interface CategoryRow {
  id: string
  slug: string
  name: string
  sort_order: number
}

interface ProductRow {
  id: string
  sku: string
  name: string
  description: string
  price: number
  stock: number
  is_visible: boolean
  sort_order: number
  categories: CategoryRow | CategoryRow[] | null
  product_images: ImageRow[] | null
}

const oneCategory = (value: ProductRow['categories']) => {
  if (!value) return null
  return Array.isArray(value) ? value[0] ?? null : value
}

const toPublicImage = (image: ImageRow) => ({
  src: productImageUrl(image.storage_path),
  alt: image.alt,
  width: image.width,
  height: image.height,
})

const toAdminImage = (image: ImageRow): AdminProductImage => ({
  id: image.id,
  storagePath: image.storage_path,
  sortOrder: image.sort_order,
  ...toPublicImage(image),
})

const sortedImages = (images: ImageRow[] | null) =>
  [...(images ?? [])].sort((a, b) => a.sort_order - b.sort_order)

export const toPublicProduct = (row: ProductRow): Product | null => {
  const category = oneCategory(row.categories)
  if (!category) return null
  return {
    sku: row.sku,
    name: row.name,
    description: row.description,
    price: row.price,
    category: { slug: category.slug, name: category.name },
    images: sortedImages(row.product_images).map(toPublicImage),
  }
}

export const toAdminProduct = (row: ProductRow): AdminProduct | null => {
  const category = oneCategory(row.categories)
  if (!category) return null
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    description: row.description,
    price: row.price,
    stock: row.stock,
    isVisible: row.is_visible,
    sortOrder: row.sort_order,
    category: {
      id: category.id,
      slug: category.slug,
      name: category.name,
      sortOrder: category.sort_order,
    },
    images: sortedImages(row.product_images).map(toAdminImage),
  }
}

export const listCategories = async (): Promise<ProductCategory[]> => {
  const supabase = anonSupabase()
  const { data, error } = await supabase
    .from('categories')
    .select('slug, name, sort_order')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })
  if (error) {
    console.error(error.message)
    fail(502, 'No se pudieron cargar las categorías')
  }
  return (data ?? []).map((category) => ({ slug: category.slug, name: category.name }))
}

const PUBLIC_PRODUCT_SELECT = `
  sku, name, description, price, sort_order,
  categories ( slug, name ),
  product_images ( storage_path, alt, width, height, sort_order )
`

export const listPublicProducts = async (): Promise<Product[]> => {
  const supabase = anonSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(PUBLIC_PRODUCT_SELECT)
    .eq('is_visible', true)
    .gt('stock', 0)
    .order('sort_order', { ascending: true })
    .order('sku', { ascending: true })
  if (error) {
    console.error(error.message)
    fail(502, 'No se pudo cargar el catálogo')
  }
  return ((data ?? []) as ProductRow[]).flatMap((row) => {
    const product = toPublicProduct(row)
    return product ? [product] : []
  })
}

export const listAdminCategories = async (): Promise<AdminCategory[]> => {
  const supabase = serviceSupabase()
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug, name, sort_order')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })
  if (error) {
    console.error(error.message)
    fail(502, 'No se pudieron cargar las categorías')
  }
  return (data ?? []).map((category) => ({
    id: category.id,
    slug: category.slug,
    name: category.name,
    sortOrder: category.sort_order,
  }))
}

const loadProductRow = async (sku: string) => {
  const supabase = serviceSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('sku', sku)
    .maybeSingle()
  if (error) {
    console.error(error.message)
    fail(502, 'No se pudo cargar el producto')
  }
  return data as ProductRow | null
}

export const getAdminProduct = async (sku: string) => {
  const row = await loadProductRow(sku)
  const product = row ? toAdminProduct(row) : null
  if (!product) fail(404, 'Producto no encontrado')
  return product
}

export const listAdminProducts = async () => {
  const supabase = serviceSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .order('sort_order', { ascending: true })
    .order('sku', { ascending: true })
  if (error) {
    console.error(error.message)
    fail(502, 'No se pudo cargar el catálogo')
  }
  return ((data ?? []) as ProductRow[]).flatMap((row) => {
    const product = toAdminProduct(row)
    return product ? [product] : []
  })
}
