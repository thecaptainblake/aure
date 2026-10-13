import { listAdminCategories } from '../../utils/catalog'
import { requireAdmin } from '../../utils/adminAuth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return listAdminCategories()
})
