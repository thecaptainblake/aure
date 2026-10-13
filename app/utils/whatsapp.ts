import { whatsappPhone } from '~~/data/site'

export const generalWhatsAppMessage = 'Hola, quisiera información sobre su catálogo.'

export const productWhatsAppMessage = (name: string, sku: string, pageUrl: string) =>
  `Hola, me interesa ${name} (ref: ${sku}). ¿Me compartes disponibilidad y precio? ${pageUrl}`

/** Arma el enlace wa.me. El mensaje completo se codifica una sola vez. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`

export const generalWhatsAppHref = whatsappLink(generalWhatsAppMessage)
