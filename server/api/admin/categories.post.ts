import { createCategory } from '../../utils/adminCatalog'
import { requireAdmin } from '../../utils/adminAuth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return createCategory(await readBody(event))
})
