import { listCategories } from '../utils/catalog'

export default defineEventHandler(async (event) => {
  setHeader(event, 'cache-control', 'no-store')
  return listCategories()
})
