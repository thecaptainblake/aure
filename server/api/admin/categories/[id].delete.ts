import { deleteCategory } from '../../../utils/adminCatalog'
import { requireAdmin } from '../../../utils/adminAuth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id') ?? ''
  return deleteCategory(id)
})
