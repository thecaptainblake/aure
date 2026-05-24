/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {number} price
 * @property {string[]} gallery
 */

/**
 * Catalog: fetches products, builds unique categories, and filters by selection.
 * @returns {{
 *   selectedCategory: import('vue').Ref<string>,
 *   categories: import('vue').ComputedRef<string[]>,
 *   filteredProducts: import('vue').ComputedRef<Product[]>
 * }}
 */
export function useProducts() {
  const appConfig = useAppConfig();
  const allCategoriesLabel = appConfig.allCategoriesLabel;

  const { data: products } = useFetch("/api/products", { default: () => [] });
  const selectedCategory = ref(allCategoriesLabel);

  const list = computed(() => products.value ?? []);

  const categories = computed(() => [
    allCategoriesLabel,
    ...[...new Set(list.value.map((p) => p.category))].sort((a, b) =>
      a.localeCompare(b, "es"),
    ),
  ]);

  const filteredProducts = computed(() => {
    if (selectedCategory.value === allCategoriesLabel) return list.value;
    return list.value.filter((p) => p.category === selectedCategory.value);
  });

  return {
    selectedCategory,
    categories,
    filteredProducts,
  };
}
