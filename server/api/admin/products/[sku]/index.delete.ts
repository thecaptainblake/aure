import { deleteProduct } from '../../../../utils/adminCatalog'
import { requireAdmin } from '../../../../utils/adminAuth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const sku = getRouterParam(event, 'sku') ?? ''
  return deleteProduct(sku)
})
