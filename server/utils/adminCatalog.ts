import { randomUUID } from 'node:crypto'
import type { ProductInput } from '#shared/catalog'
import { getAdminProduct, listAdminCategories, listAdminProducts } from './catalog'
import { fail, throwSupabaseError } from './http'
import { inspectImage } from './imageSize'
import { serviceSupabase } from './supabase'

const SKU_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const MAX_IMAGE_BYTES = 8 * 1024 * 1024
const MAX_IMAGES = 5

export const toSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

export const parseProductInput = (body: unknown): ProductInput => {
  if (!body || typeof body !== 'object') fail(400, 'Datos inválidos')
  const record = body as Record<string, unknown>
  const sku = typeof record.sku === 'string' ? record.sku.trim().toLowerCase() : ''
  const name = typeof record.name === 'string' ? record.name.trim() : ''
  const description = typeof record.description === 'string' ? record.description.trim() : ''
  const categoryId = typeof record.categoryId === 'string' ? record.categoryId : ''
  const { price, stock, isVisible } = record

  if (!name || name.length > 120) fail(400, 'Escribe un título de hasta 120 caracteres')
  if (description.length > 5000) fail(400, 'La descripción es demasiado larga')
  if (!SKU_PATTERN.test(sku) || sku.length > 80) {
    fail(400, 'El SKU solo puede usar minúsculas, números y guiones')
  }
  if (!UUID_PATTERN.test(categoryId)) fail(400, 'Elige una categoría')
  if (typeof price !== 'number' || !Number.isInteger(price) || price < 0 || price > 10_000_000) {
    fail(400, 'El precio debe ser un entero en pesos')
  }
  if (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0 || stock > 99_999) {
    fail(400, 'El stock debe ser un entero de 0 en adelante')
  }
  if (typeof isVisible !== 'boolean') fail(400, 'Indica si la pieza es visible')

  return { sku, name, description, categoryId, price, stock, isVisible }
}

export const parseDirection = (body: unknown) => {
  if (!body || typeof body !== 'object') fail(400, 'Datos inválidos')
  const direction = (body as { direction?: unknown }).direction
  if (direction !== 'up' && direction !== 'down') fail(400, 'Dirección inválida')
  return direction
}

const parseCategoryName = (body: unknown) => {
  if (!body || typeof body !== 'object') fail(400, 'Datos inválidos')
  const name = (body as { name?: unknown }).name
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 80) {
    fail(400, 'Escribe un nombre de hasta 80 caracteres')
  }
  const slug = toSlug(name)
  if (!slug) fail(400, 'El nombre no produce una dirección válida')
  return { name: name.trim(), slug }
}

const nextSortOrder = async (table: 'products' | 'categories') => {
  const supabase = serviceSupabase()
  const { data, error } = await supabase
    .from(table)
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throwSupabaseError(error)
  return (data?.sort_order ?? -1) + 1
}

const swapSort = async (
  rows: { id: string, sort_order: number }[],
  id: string,
  direction: 'up' | 'down',
  update: (rowId: string, sortOrder: number) => Promise<void>,
) => {
  const index = rows.findIndex((row) => row.id === id)
  if (index < 0) fail(404, 'No encontrado')
  const neighborIndex = direction === 'up' ? index - 1 : index + 1
  const current = rows[index]
  const neighbor = rows[neighborIndex]
  if (!current || !neighbor) return
  const temp = 1_000_000 + current.sort_order
  await update(current.id, temp)
  await update(neighbor.id, current.sort_order)
  await update(current.id, neighbor.sort_order)
}

export const createCategory = async (body: unknown) => {
  const { name, slug } = parseCategoryName(body)
  const supabase = serviceSupabase()
  const sortOrder = await nextSortOrder('categories')
  const { error } = await supabase.from('categories').insert({ name, slug, sort_order: sortOrder })
  if (error) throwSupabaseError(error)
  return listAdminCategories()
}

export const updateCategory = async (id: string, body: unknown) => {
  if (!UUID_PATTERN.test(id)) fail(400, 'Categoría inválida')
  const { name, slug } = parseCategoryName(body)
  const supabase = serviceSupabase()
  const { error } = await supabase.from('categories').update({ name, slug }).eq('id', id)
  if (error) throwSupabaseError(error)
  return listAdminCategories()
}

export const deleteCategory = async (id: string) => {
  if (!UUID_PATTERN.test(id)) fail(400, 'Categoría inválida')
  const supabase = serviceSupabase()
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throwSupabaseError(error)
  return listAdminCategories()
}

export const moveCategory = async (id: string, direction: 'up' | 'down') => {
  if (!UUID_PATTERN.test(id)) fail(400, 'Categoría inválida')
  const categories = await listAdminCategories()
  const supabase = serviceSupabase()
  await swapSort(
    categories.map((category) => ({ id: category.id, sort_order: category.sortOrder })),
    id,
    direction,
    async (rowId, sortOrder) => {
      const { error } = await supabase.from('categories').update({ sort_order: sortOrder }).eq('id', rowId)
      if (error) throwSupabaseError(error)
    },
  )
  return listAdminCategories()
}

export const createProduct = async (input: ProductInput) => {
  const supabase = serviceSupabase()
  const sortOrder = await nextSortOrder('products')
  const { data, error } = await supabase
    .from('products')
    .insert({
      sku: input.sku,
      name: input.name,
      description: input.description,
      category_id: input.categoryId,
      price: input.price,
      stock: input.stock,
      is_visible: input.isVisible,
      sort_order: sortOrder,
    })
    .select('sku')
    .single()
  if (error) throwSupabaseError(error)
  return getAdminProduct(data.sku)
}

export const updateProduct = async (sku: string, input: ProductInput) => {
  const supabase = serviceSupabase()
  const { data, error } = await supabase
    .from('products')
    .update({
      sku: input.sku,
      name: input.name,
      description: input.description,
      category_id: input.categoryId,
      price: input.price,
      stock: input.stock,
      is_visible: input.isVisible,
    })
    .eq('sku', sku)
    .select('sku')
    .maybeSingle()
  if (error) throwSupabaseError(error)
  if (!data) fail(404, 'Producto no encontrado')
  return getAdminProduct(data.sku)
}

export const deleteProduct = async (sku: string) => {
  const product = await getAdminProduct(sku)
  const supabase = serviceSupabase()
  const paths = product.images.map((image) => image.storagePath)
  if (paths.length) {
    const { error: storageError } = await supabase.storage.from('product-images').remove(paths)
    if (storageError) console.error(storageError.message)
  }
  const { error } = await supabase.from('products').delete().eq('id', product.id)
  if (error) throwSupabaseError(error)
  return { ok: true }
}

export const moveProduct = async (sku: string, direction: 'up' | 'down') => {
  const products = await listAdminProducts()
  const supabase = serviceSupabase()
  const current = products.find((product) => product.sku === sku)
  if (!current) fail(404, 'Producto no encontrado')
  await swapSort(
    products.map((product) => ({ id: product.id, sort_order: product.sortOrder })),
    current.id,
    direction,
    async (rowId, sortOrder) => {
      const { error } = await supabase.from('products').update({ sort_order: sortOrder }).eq('id', rowId)
      if (error) throwSupabaseError(error)
    },
  )
  return listAdminProducts()
}

export const uploadProductImage = async (sku: string, file: Buffer, alt: string) => {
  const cleanAlt = alt.trim()
  if (!cleanAlt || cleanAlt.length > 200) fail(400, 'Escribe un texto alternativo de hasta 200 caracteres')
  if (file.length === 0 || file.length > MAX_IMAGE_BYTES) fail(400, 'La foto debe pesar hasta 8 MB')
  const inspected = inspectImage(file)
  if (!inspected) fail(400, 'La foto debe ser JPG, PNG o WebP')

  const product = await getAdminProduct(sku)
  if (product.images.length >= MAX_IMAGES) fail(400, 'Cada producto acepta hasta 5 fotos')

  const storagePath = `${product.id}/${randomUUID()}.${inspected.extension}`
  const supabase = serviceSupabase()
  const { error: uploadError } = await supabase.storage.from('product-images').upload(storagePath, file, {
    contentType: inspected.mime,
    upsert: false,
  })
  if (uploadError) {
    console.error(uploadError.message)
    fail(502, 'No se pudo subir la foto')
  }

  const sortOrder = product.images.reduce((max, image) => Math.max(max, image.sortOrder), -1) + 1
  const { error } = await supabase.from('product_images').insert({
    product_id: product.id,
    storage_path: storagePath,
    alt: cleanAlt,
    width: inspected.width,
    height: inspected.height,
    sort_order: sortOrder,
  })
  if (error) {
    await supabase.storage.from('product-images').remove([storagePath])
    throwSupabaseError(error)
  }
  return getAdminProduct(product.sku)
}

export const deleteProductImage = async (sku: string, imageId: string) => {
  if (!UUID_PATTERN.test(imageId)) fail(400, 'Foto inválida')
  const product = await getAdminProduct(sku)
  const image = product.images.find((item) => item.id === imageId)
  if (!image) fail(404, 'Foto no encontrada')
  const supabase = serviceSupabase()
  const { error } = await supabase.from('product_images').delete().eq('id', imageId)
  if (error) throwSupabaseError(error)
  if (image.storagePath) {
    const { error: storageError } = await supabase.storage.from('product-images').remove([image.storagePath])
    if (storageError) console.error(storageError.message)
  }
  return getAdminProduct(product.sku)
}

export const moveProductImage = async (sku: string, imageId: string, direction: 'up' | 'down') => {
  if (!UUID_PATTERN.test(imageId)) fail(400, 'Foto inválida')
  const product = await getAdminProduct(sku)
  const supabase = serviceSupabase()
  await swapSort(
    product.images.map((image) => ({ id: image.id, sort_order: image.sortOrder })),
    imageId,
    direction,
    async (rowId, sortOrder) => {
      const { error } = await supabase.from('product_images').update({ sort_order: sortOrder }).eq('id', rowId)
      if (error) throwSupabaseError(error)
    },
  )
  return getAdminProduct(product.sku)
}
