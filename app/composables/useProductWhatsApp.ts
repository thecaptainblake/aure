import type { Product } from '#shared/catalog'
import { productWhatsAppMessage, whatsappLink } from '~/utils/whatsapp'

export const useProductWhatsApp = (product: MaybeRefOrGetter<Product>) => {
  const requestUrl = useRequestURL()

  const href = computed(() => {
    const item = toValue(product)
    const pageUrl = `${requestUrl.origin}/producto/${item.sku}`
    return whatsappLink(productWhatsAppMessage(item.name, item.sku, pageUrl))
  })

  return { href }
}
