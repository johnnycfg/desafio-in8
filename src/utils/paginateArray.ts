/** Função que faz a paginação de um array
 * @param array array a ser paginado.
 * @param itemsPerPage quantidade de itens por página.
 * @param currentPage página atual.
 */
export function paginateArray<T>(
  array: T[],
  itemsPerPage: number,
  currentPage: number,
) {
  if (!Array.isArray(array)) return []

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return array.slice(startIndex, endIndex)
}
