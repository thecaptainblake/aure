import { updateCategory } from '../../../utils/adminCatalog'
import { requireAdmin } from '../../../utils/adminAuth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id') ?? ''
  return updateCategory(id, await readBody(event))
})
