export const mapOrder = (array: [], order: string, key: string) => {
  array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
  return array
}
