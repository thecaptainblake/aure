/** GraphQL: product list with gallery from Hygraph. */
const PRODUCTS_QUERY =
  "{ products(first: 100) { id title description category price gallery { url } } }";

/**
 * GET /api/products — Hygraph proxy; maps gallery to flat URL strings.
 * @returns {Promise<{ id: string, title: string, description: string, category: string, price: number, gallery: string[] }[]>}
 */
export default defineEventHandler(async () => {
  const {
    hygraphToken: token,
    public: { hygraphEndpoint: url },
  } = useRuntimeConfig();

  if (!url || !token) {
    throw createError({
      statusCode: 500,
      message: "Falta HYGRAPH_ENDPOINT o HYGRAPH_TOKEN en .env",
    });
  }

  const { data, errors } = await $fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: { query: PRODUCTS_QUERY },
  });

  if (errors?.[0]) {
    throw createError({ statusCode: 502, message: errors[0].message });
  }

  return (data?.products ?? []).map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    gallery: product.gallery.map((image) => image.url),
  }));
});
