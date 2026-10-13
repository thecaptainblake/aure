import { moveProduct, parseDirection } from '../../utils/adminCatalog'
import { requireAdmin } from '../../utils/adminAuth'
import { fail } from '../../utils/http'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  const sku = body && typeof body === 'object' && typeof body.sku === 'string' ? body.sku : ''
  if (!sku) fail(400, 'Producto inválido')
  return moveProduct(sku, parseDirection(body))
})
