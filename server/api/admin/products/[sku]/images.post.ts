import { uploadProductImage } from '../../../../utils/adminCatalog'
import { requireAdmin } from '../../../../utils/adminAuth'
import { fail } from '../../../../utils/http'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const sku = getRouterParam(event, 'sku') ?? ''
  const parts = await readMultipartFormData(event)
  const file = parts?.find((part) => part.name === 'file' && part.data?.length)
  const altPart = parts?.find((part) => part.name === 'alt')
  if (!file) fail(400, 'Elige una foto')
  const alt = altPart?.data.toString('utf8') ?? ''
  return uploadProductImage(sku, Buffer.from(file.data), alt)
})
