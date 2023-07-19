/** Função que formata um valor para a moeda de um país
 * @param value valor a ser formatado.
 * @param locale o código do idioma e o código do país. Valor padrão: 'pt-BR'.
 * @param currency a sigla da unidade monetária do país. Valor padrão: 'BRL'.
 */
export function currencyFormatter(
  value: number,
  locale = 'pt-BR',
  currency = 'BRL',
) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  return formatter.format(value)
}
