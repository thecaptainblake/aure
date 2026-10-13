export const fail = (statusCode: number, statusMessage: string): never => {
  throw createError({ statusCode, statusMessage, message: statusMessage })
}

export const throwSupabaseError = (error: { code?: string, message: string }): never => {
  console.error(error.message)
  if (error.code === '23505') fail(409, 'Ese valor ya existe')
  if (error.code === '23503') fail(409, 'La categoría todavía tiene productos')
  fail(502, 'No se pudo guardar')
}
