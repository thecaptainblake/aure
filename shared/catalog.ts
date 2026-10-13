export interface ProductImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ProductCategory {
  slug: string
  name: string
}

export interface Product {
  sku: string
  name: string
  description: string
  price: number
  category: ProductCategory
  images: ProductImage[]
}

export interface AdminProductImage extends ProductImage {
  id: string
  storagePath: string
  sortOrder: number
}

export interface AdminCategory extends ProductCategory {
  id: string
  sortOrder: number
}

export interface AdminProduct {
  id: string
  sku: string
  name: string
  description: string
  price: number
  stock: number
  isVisible: boolean
  sortOrder: number
  category: AdminCategory
  images: AdminProductImage[]
}

export interface ProductInput {
  sku: string
  name: string
  description: string
  categoryId: string
  price: number
  stock: number
  isVisible: boolean
}
