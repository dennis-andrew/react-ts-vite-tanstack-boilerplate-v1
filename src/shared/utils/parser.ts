export const parseNumber = (val: unknown, defaultValue = 0) => {
  const num = Number(val)

  return isNaN(num) ? defaultValue : num
}
