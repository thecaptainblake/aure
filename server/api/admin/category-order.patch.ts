import { moveCategory, parseDirection } from '../../utils/adminCatalog'
import { requireAdmin } from '../../utils/adminAuth'
import { fail } from '../../utils/http'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  const id = body && typeof body === 'object' && typeof body.id === 'string' ? body.id : ''
  if (!id) fail(400, 'Categoría inválida')
  return moveCategory(id, parseDirection(body))
})
