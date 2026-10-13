import { deleteProductImage } from '../../../../../utils/adminCatalog'
import { requireAdmin } from '../../../../../utils/adminAuth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const sku = getRouterParam(event, 'sku') ?? ''
  const imageId = getRouterParam(event, 'imageId') ?? ''
  return deleteProductImage(sku, imageId)
})
