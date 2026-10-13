import { siteUrl } from '~~/data/site'

interface PageSeoInput {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  path: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string | undefined>
  jsonLd?: MaybeRefOrGetter<Record<string, unknown> | undefined>
  robots?: MaybeRefOrGetter<string | undefined>
}

export const usePageSeo = (input: PageSeoInput) => {
  const title = computed(() => toValue(input.title))
  const description = computed(() => toValue(input.description))
  const path = computed(() => toValue(input.path))
  const canonical = computed(() => `${siteUrl}${path.value}`)
  const image = computed(() => {
    const src = toValue(input.image)
    if (!src) return `${siteUrl}/portada.jpg`
    if (src.startsWith('http')) return src
    return `${siteUrl}${src}`
  })

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogType: 'website',
    ogLocale: 'es_MX',
    ogImage: image,
    robots: computed(() => toValue(input.robots) ?? 'index, follow'),
  })

  useHead({
    link: computed(() => [{ rel: 'canonical', href: canonical.value }]),
    script: computed(() => {
      const data = toValue(input.jsonLd)
      if (!data) return []
      return [
        {
          key: 'ld-json',
          type: 'application/ld+json',
          innerHTML: JSON.stringify(data),
        },
      ]
    }),
  })
}
